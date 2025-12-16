import { Card, CardBody, CardHeader } from "@heroui/react";
import { Lock } from "lucide-react";

const EmailForm = ({ resetUrl }: { resetUrl: string }) => {
  return (
    <div className="w-full flex items-center justify-center min-h-screen">
      <Card className="max-w-[400px] p-5">
        <CardHeader className="flex gap-3 justify-center items-center">
          <Lock height={50} width={50} />
        </CardHeader>
        <CardBody className="flex items-center justify-center gap-3">
          <h1 className="font-bold">Hello, it's Clixo</h1>
          <p className="text-center text-[15px] text-gray-600">
            You received this message because you wanted to reset your password.
            to do it click on the button below:
          </p>

          <a
            href={resetUrl}
            style={{
              display: "inline-block",
              padding: "12px 20px",
              backgroundColor: "#3b82f6",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              textAlign: "center",
              width: "100%",
              cursor: "pointer",
            }}
          >
            Change password
          </a>
          <p className="text-gray-500 text-[13px]">
            If you didn't want to do this, just ignore this message.
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default EmailForm;
// `<p>Click the link to reset your password:</p>
//            <a href="${resetUrl}">${resetUrl}</a>`,
