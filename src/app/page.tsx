"use client";
import LoginForm from "@/forms/loginForm";
import RegisterForm from "@/forms/registerForm";
import Logo from "@/images/Logo";
import { useState } from "react";
export default function Home() {
  const [form, setForm] = useState<"login" | "register">("login");

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <main className="flex flex-col items-center justify-between w-[350px] px-16 gap-2">
        <div className="mb-5">
          <Logo />
        </div>

        {form === "login" ? (
          <LoginForm changeForm={setForm} />
        ) : (
          <RegisterForm changeForm={setForm} />
        )}
      </main>
    </div>
  );
}
