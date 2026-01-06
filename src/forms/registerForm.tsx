"use client";
import { registerUser } from "@/actions/auth/register";
import GoogleEnter from "@/components/common/GoogleEnter";
import { addToast, Button, Divider, Input } from "@heroui/react";
import { Dispatch, FC, SetStateAction, useState } from "react";

interface Props {
  changeForm: Dispatch<SetStateAction<"login" | "register">>;
}

const RegisterForm: FC<Props> = ({ changeForm }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await registerUser(formData);

    if ("error" in result) {
      addToast({
        title: result.error,
        color: "danger",
      });
    } else {
      addToast({
        title: "User is registered successfully!",
        color: "success",
      });
      changeForm("login");
    }
  };

  const isModifyDisabled = (() => {
    if (!formData.email) return true;

    if (!formData.password) return true;

    if (formData.password.length < 6) return true;

    if (formData.password !== formData.confirmPassword) return true;

    if (!formData.name) return true;

    return false;
  })();

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
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
              return 'The email address must contain the "@" symbol.';
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
        <Input
          isRequired
          placeholder="confirm password"
          type="password"
          radius="sm"
          size="lg"
          name="confirmPassword"
          value={formData.confirmPassword}
          onInput={handleChange}
          validate={(value) => {
            if (!value) return "This field is required";
            if (value !== formData.password)
              return "The password is not the same";
            return null;
          }}
        />
        <Input
          isRequired
          placeholder="name"
          radius="sm"
          size="lg"
          name="name"
          value={formData.name}
          onInput={handleChange}
          validate={(value) => {
            if (!value) return "The name is required";
            return null;
          }}
        />
        <Button
          className="w-full"
          color="primary"
          size="lg"
          isDisabled={isModifyDisabled}
          type="submit"
          data-testid="submit-button"
        >
          Create
        </Button>
      </form>

      <div className="flex items-center w-full">
        <Divider className="flex-1" />
        <p className="px-3 text-sm text-gray-500">or</p>
        <Divider className="flex-1" />
      </div>
      <GoogleEnter />
      <div className="flex flex-col items-center gap-1 mt-3 text-[13px]">
        <p className="text-gray-500">
          Already have an account?{" "}
          <button
            className="text-primary hover:underline cursor-pointer"
            onClick={() => changeForm("login")}
          >
            Enter
          </button>
        </p>
      </div>
    </>
  );
};

export default RegisterForm;
