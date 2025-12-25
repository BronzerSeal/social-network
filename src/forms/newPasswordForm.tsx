"use client";
import { updatePassword } from "@/actions/update-password";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
} from "@heroui/react";
import { Lock } from "lucide-react";

export default function NewPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const submitNewPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirm) {
      addToast({ title: "Passwords do not match", color: "danger" });
      return;
    }
    if (!token) {
      addToast({
        title:
          "An error occurred, please try following the link in the email again.",
        color: "danger",
      });
      return;
    }

    const result = await updatePassword({ token, password });
    if (result.ok) {
      addToast({
        title: "success",
        color: "success",
      });
      router.push("/");
    } else {
      addToast({
        title: result.error || "Failed to update password",
        color: "danger",
      });
    }
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen">
      <Card className="max-w-[400px] p-5">
        <CardHeader className="flex gap-3 justify-center items-center">
          <Lock height={50} width={50} />
        </CardHeader>
        <CardBody className="flex items-center justify-center gap-3">
          <h1 className="font-bold">New password</h1>
          <p className="text-center text-[15px] text-gray-600">
            Try to create something interesting and challenging enough
          </p>
          <form
            onSubmit={submitNewPassword}
            className="w-full flex gap-3 flex-col"
          >
            <Input
              placeholder="password"
              radius="sm"
              size="lg"
              type="password"
              value={password}
              onInput={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              validate={(value) => {
                if (!value) return "Password is required";
                if (value.length < 6)
                  return "The password must be at least 6 characters long.";
                return null;
              }}
            />
            <Input
              isRequired
              placeholder="confirm password"
              type="password"
              radius="sm"
              size="lg"
              name="confirmPassword"
              value={confirm}
              onInput={(e: ChangeEvent<HTMLInputElement>) =>
                setConfirm(e.target.value)
              }
              validate={(value) => {
                if (!value) return "This field is required";
                if (value !== password) return "The password is not the same ";
                return null;
              }}
            />
            <Button
              color="primary"
              className="w-full"
              type="submit"
              isDisabled={
                !password || password.length < 6 || password !== confirm
              }
              data-testid="submit-button"
            >
              Save
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
