import { createComment } from "@/actions/posts/comments/createComment";
import NewCommentForm from "@/forms/newCommentForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SessionProvider } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  useSession: () => ({
    data: null,
    status: "unauthenticated",
  }),
}));

jest.mock("@/actions/posts/comments/createComment", () => ({
  createComment: jest.fn(),
}));

describe("new comment form", () => {
  const changeFormMock = jest.fn();
  test("should be inactive if input without text", async () => {
    render(<NewCommentForm postId="1" setComments={changeFormMock} />);
    const input = await screen.findByPlaceholderText(/write comment/i);
    await userEvent.type(input, "1111");
    await userEvent.clear(input);
    expect(await screen.findByTestId("commentSubmit")).toBeDisabled();
  });

  test("should create comment if all OK", async () => {
    // @ts-ignore
    createComment.mockResolvedValue({
      success: true,
      code: 200,
      comment: {
        postId: "1",
        userId: "1",
        text: "1111",
      },
    });
    render(<NewCommentForm postId="1" setComments={changeFormMock} />);
    const input = await screen.findByPlaceholderText(/write comment/i);
    await userEvent.type(input, "1111");
    expect(await screen.findByTestId("commentSubmit")).toBeEnabled();
  });
});
