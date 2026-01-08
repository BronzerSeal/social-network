// app/api/yookassa/create-payment/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const shopId = process.env.YOOKASSA_SHOP_ID!;
  const secretKey = process.env.YOOKASSA_SECRET_KEY!;

  const paymentData = {
    amount: { value: "2.00", currency: "RUB" },
    confirmation: { type: "embedded" },
    capture: true,
    description: "Тестовый заказ",
  };

  try {
    const res = await fetch("https://api.yookassa.ru/v3/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotence-Key": crypto.randomUUID(),
        Authorization:
          "Basic " + Buffer.from(`${shopId}:${secretKey}`).toString("base64"),
      },
      body: JSON.stringify(paymentData),
    });

    const data = await res.json();
    return NextResponse.json({
      confirmationToken: data.confirmation.confirmation_token,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Не удалось создать платеж" },
      { status: 500 }
    );
  }
}
