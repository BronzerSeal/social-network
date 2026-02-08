import Link from "next/link";

export function renderHashtags(text: string) {
  return text.split(" ").map((word, index) => {
    if (!word.startsWith("#")) {
      return word + " ";
    }

    const match = word.match(/^#([\p{L}\p{N}_]+)/u);
    if (!match) {
      return word + " ";
    }

    const tag = match[1];
    const rest = word.slice(tag.length + 1);

    return (
      <span key={index}>
        <Link
          href={`/hashtag/${tag}`}
          className="text-blue-500 hover:underline"
        >
          #{tag}
        </Link>
        {rest}{" "}
      </span>
    );
  });
}
