import { createComment } from "@/actions/posts/comments/createComment";
import { prismaMock } from "../../../../../singleton";

describe("Create comment", () => {
  it("should return error if something was wrong", async () => {
    prismaMock.comment.create.mockRejectedValue({
      error: "something was wrong",
    });
    const response = await createComment("1", "1", "new comm");

    expect(response).toEqual({ error: "Error creating comment" });
  });

  it("should create comment if all OK", async () => {
    const date = new Date();
    prismaMock.comment.create.mockResolvedValue({
      id: "1",
      postId: "1",
      userId: "1",
      text: "new comm",
      createdAt: date,
      updatedAt: date,
    });

    const response = await createComment("1", "1", "new comm");

    expect(response).toEqual({
      success: true,
      code: 200,
      comment: {
        id: "1",
        postId: "1",
        userId: "1",
        text: "new comm",
        createdAt: date,
        updatedAt: date,
      },
    });
  });
});
