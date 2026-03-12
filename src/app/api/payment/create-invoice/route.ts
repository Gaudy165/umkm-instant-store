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
      // Optional: use callback_url for webhooks if needed
      // callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/mayar/webhook`,
    });

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
