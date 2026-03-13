import { NextResponse } from "next/server";
import { createMayarInvoice } from "@/lib/mayar";

export async function POST(req: Request) {
  try {
    const { amount, name, email, mobile, description, productId, storeId, redirect_url } = await req.json();

    // Basic validation
    if (!amount || !name || !email || !mobile || !description) {
      return NextResponse.json(
        { error: "Missing required fields (amount, name, email, mobile, description)" },
        { status: 400 }
      );
    }

    const invoice = await createMayarInvoice({
      amount,
      name,
      email,
      mobile,
      description,
      redirect_url,
    });

    // Persist invoice to Firestore
    try {
      const { collection, addDoc } = await import("firebase/firestore");
      const { db } = await import("@/lib/firestore");
      
      await addDoc(collection(db, "invoices"), {
        storeId,
        productId,
        amount,
        customerName: name,
        customerEmail: email,
        customerMobile: mobile,
        description,
        mayarId: invoice.id || invoice.link_id,
        status: "pending",
        createdAt: new Date(),
      });
    } catch (dbError) {
      console.error("Failed to save invoice to Firestore:", dbError);
      // We still return the invoice link to the user even if DB save fails
    }

    console.log("Invoice object to return:", JSON.stringify(invoice, null, 2));
    return NextResponse.json(invoice);
  } catch (error: any) {
    console.error("Mayar Invoice Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create invoice" },
      { status: 500 }
    );
  }
}
