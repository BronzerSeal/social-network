import Link from "next/link";

export function renderHashtags(text: string) {
  return text.split(" ").map((word, index) => {
    if (word.startsWith("#")) {
      const tag = word.slice(1);
      return (
        <Link
          key={index}
          href={`/hashtag/${tag}`}
          className="text-blue-500 hover:underline"
        >
          {word}{" "}
        </Link>
      );
    }
    return word + " ";
  });
}
