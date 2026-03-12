import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    console.log("Mayar Webhook Received:", payload);

    // Mayar webhook events usually have a status or event type
    // Handle 'payment.received' or similar based on Mayar docs
    const { status, status_code, amount, mobile, name, email } = payload;

    if (status === "p" || status === "paid") {
      // payment.received logic here
      console.log(`Payment confirmed for ${name} (${email}) - Amount: ${amount}`);
      
      // Update order status in Firestore if you have an orders collection
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
