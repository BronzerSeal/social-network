export function formatTime(input: string | Date): string {
  const date = input instanceof Date ? input : new Date(input);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  // меньше минуты
  if (diffSec < 60) return "less than a minute ago";

  // минуты
  if (diffMin < 60) return `${diffMin} minutes ago`;

  // часы
  if (diffHours < 24) return `${diffHours} hours ago`;

  // вчера
  if (diffDays === 1) return "yesterday";

  // до 7 дней
  if (diffDays < 7) return `${diffDays} days ago`;

  // иначе: 30 дек 2025
  return date.toLocaleDateString("en-EN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
