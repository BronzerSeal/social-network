"use client";
import { signInWithCredentials } from "@/actions/sign-in";
import GoogleEnter from "@/components/common/GoogleEnter";
import { pageUrls } from "@/configs/pageUrls.config";
import { addToast, Button, Divider, Input } from "@heroui/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Dispatch, FC, SetStateAction, useState } from "react";

interface Props {
  changeForm: Dispatch<SetStateAction<"login" | "register">>;
}

const LoginForm: FC<Props> = ({ changeForm }) => {
  const { data: session } = useSession();
  console.log(session);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signInWithCredentials(
      formData.email,
      formData.password
    );
    console.log(result);

    if (result && result.error) {
      if (result.error === "CredentialsSignin") {
        addToast({
          title: "Incorrect login or password",
          color: "danger",
        });
      } else {
        addToast({
          title: `Authorization error: ${result.error}`,
          color: "danger",
        });
      }
    } else {
      addToast({
        title: "Login successful!",
        color: "success",
      });
      redirect(pageUrls.feedPage);
    }
  };

  return (
    <>
      <form
        className="flex flex-col items-center justify-between gap-2"
        onSubmit={handleSubmit}
      >
        <Input
          isRequired
          placeholder="email"
          name="email"
          type="Email"
          radius="sm"
          size="lg"
          value={formData.email}
          onInput={handleChange}
          validate={(value) => {
            if (!value) return "Email is required";
            return null;
          }}
        />
        <Input
          isRequired
          placeholder="password"
          type="password"
          radius="sm"
          size="lg"
          name="password"
          value={formData.password}
          onInput={handleChange}
          validate={(value) => {
            if (!value) return "Password is required";
            if (value.length < 6)
              return "The password must be at least 6 characters long.";
            return null;
          }}
        />
        <Button
          className="w-full"
          color="primary"
          size="lg"
          isDisabled={
            !formData.email ||
            !formData.password ||
            formData.password.length < 6
          }
          type="submit"
        >
          Enter
        </Button>
      </form>

      <div className="flex items-center w-full">
        <Divider className="flex-1" />
        <p className="px-3 text-sm text-gray-500">or</p>
        <Divider className="flex-1" />
      </div>
      <GoogleEnter />
      <div className="flex flex-col items-center gap-1 mt-3 text-[13px]">
        <button
          className="text-primary hover:underline cursor-pointer"
          onClick={() => redirect(pageUrls.resetPasswordPage)}
        >
          Remind password?
        </button>

        <p className="text-gray-500">
          Don't have an account?{" "}
          <button
            className="text-primary hover:underline cursor-pointer"
            onClick={() => changeForm("register")}
          >
            Create
          </button>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
