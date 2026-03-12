export const createMayarInvoice = async (data: {
  amount: number;
  name: string;
  email: string;
  mobile?: string;
  description: string;
  callback_url?: string;
  redirect_url?: string;
}) => {
  const apiKey = (process.env.MAYAR_API_KEY || "").trim();

  // Based on Mayar Headless Commerce Documentation:
  // POST https://api.mayar.id/hl/v1/payment/create
  const paymentData = {
    name: data.name,
    email: data.email,
    amount: data.amount,
    mobile: data.mobile,
    description: data.description,
    redirectUrl: data.redirect_url || "https://mayar.id", 
    // Expire in 24 hours (ISO 8601 format required by Headless API)
    expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  };

  console.log("Mayar API Outgoing Payload:", JSON.stringify(paymentData, null, 2));

  const response = await fetch("https://api.mayar.id/hl/v1/payment/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(paymentData),
  });

  const responseText = await response.text();
  console.log("Mayar API Raw Response:", responseText);

  let result;
  try {
    result = JSON.parse(responseText);
  } catch (e) {
    throw new Error(`Failed to parse Mayar response: ${responseText.substring(0, 100)}`);
  }

  if (!response.ok || result.statusCode !== 200) {
    throw new Error(JSON.stringify(result));
  }

  // Double check if data.link exists (official docs say result.data.link)
  return result.data || result;
};
