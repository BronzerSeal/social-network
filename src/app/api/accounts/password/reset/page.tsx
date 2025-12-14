"use client";
import { pageUrls } from "@/configs/pageUrls.config";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from "@heroui/react";
import { Link, Lock } from "lucide-react";
import { redirect } from "next/navigation";
import { ChangeEvent, useState } from "react";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  return (
    <div className="w-full flex  items-center justify-center min-h-screen">
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
          <Input
            placeholder="email"
            type="email"
            radius="sm"
            value={email}
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <Button color="primary" className="w-full" isDisabled={!email}>
            change password
          </Button>
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
