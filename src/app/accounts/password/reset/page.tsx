"use client";
import { sendResetLink } from "@/actions/send-reset-link-change-password";
// import { sendResetLink } from "@/actions/send-reset-link";
import { pageUrls } from "@/configs/pageUrls.config";
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from "@heroui/react";
import { Link, Lock } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ChangeEvent, useState } from "react";

const ResetPasswordPage = () => {
  const { data: session } = useSession();
  console.log(session);
  const [email, setEmail] = useState("");

  const submitNewPassword = async () => {
    try {
      await sendResetLink(email);
    } catch (error) {
      addToast({
        title: "Error sending email",
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
          <h1 className="font-bold">Can't enter?</h1>
          <p className="text-center text-[15px] text-gray-600">
            Enter your email address, username, or phone number and we'll send
            you a link to restore access to your account.
          </p>
          <form
            onSubmit={submitNewPassword}
            className="w-full flex gap-3 flex-col"
          >
            <Input
              placeholder="email"
              radius="sm"
              value={email}
              onInput={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
            <Button
              color="primary"
              className="w-full"
              type="submit"
              isDisabled={!email}
            >
              send Email
            </Button>
          </form>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => redirect(pageUrls.LoginPage)}
          >
            <Link href={pageUrls.LoginPage}></Link>
            Return to Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
