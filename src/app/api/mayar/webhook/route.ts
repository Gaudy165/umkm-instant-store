import { NextResponse } from "next/server";
import { updateInvoiceStatusByMayarId } from "@/lib/invoiceService";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    console.log("Mayar Webhook Received:", payload);

    // Mayar webhook usually provides status and some identifier
    // the field might be 'id', 'link_id', or 'payment_id' depending on the API version
    const { status, id, link_id, payment_id } = payload;
    const mayarId = id || link_id || payment_id;

    if (!mayarId) {
      console.warn("Webhook received without a identifiable ID:", payload);
      return NextResponse.json({ received: true, info: "No ID found" });
    }

    if (status === "p" || status === "paid" || status === "success") {
      console.log(`Payment confirmed for Mayar ID: ${mayarId}`);
      
      const updated = await updateInvoiceStatusByMayarId(mayarId, "paid");
      if (updated) {
        console.log(`Invoice status updated to 'paid' in Firestore.`);
      } else {
        console.warn(`No invoice found in Firestore with Mayar ID: ${mayarId}`);
      }
    } else if (status === "failed" || status === "expired") {
      await updateInvoiceStatusByMayarId(mayarId, status);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook Error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
