"use client";

import { useEffect, useRef, useState } from "react";

export default function PaymentPage() {
  const [token, setToken] = useState("");
  const checkoutRef = useRef<any>(null);

  useEffect(() => {
    fetch("/api/yookassa/create-payment", { method: "POST" })
      .then((res) => res.json())
      .then((data) => setToken(data.confirmationToken));
  }, []);

  useEffect(() => {
    if (!token) return;

    const initWidget = () => {
      // 💣 если был старый — уничтожаем
      if (checkoutRef.current) {
        checkoutRef.current.destroy();
        checkoutRef.current = null;
      }

      // 💣 чистим контейнер
      const container = document.getElementById("payment-form");
      if (container) container.innerHTML = "";

      const checkout = new (window as any).YooMoneyCheckoutWidget({
        confirmation_token: token,
        return_url: `${window.location.origin}/payment/succeeded`,
        error_callback: (error: any) => console.log(error),
      });

      checkout.render("payment-form");
      checkoutRef.current = checkout;
    };

    if (!(window as any).YooMoneyCheckoutWidget) {
      const script = document.createElement("script");
      script.src = "https://yookassa.ru/checkout-widget/v1/checkout-widget.js";
      script.async = true;
      script.onload = initWidget;
      document.body.appendChild(script);
    } else {
      initWidget();
    }

    // ✅ cleanup при уходе со страницы
    return () => {
      if (checkoutRef.current) {
        checkoutRef.current.destroy();
        checkoutRef.current = null;
      }
    };
  }, [token]);

  return (
    <div style={{ maxWidth: 420, margin: "40px auto" }}>
      <h1>Оплата</h1>

      <div id="payment-form"></div>

      <div style={{ marginTop: 20 }}>
        <p>Тестовые данные карты:</p>
        <ul>
          <li>Номер: 5555 5555 5555 4477</li>
          <li>Срок действия: 01/30</li>
          <li>CVC: 123</li>
          <li>3-D Secure: 123</li>
        </ul>
      </div>
    </div>
  );
}
