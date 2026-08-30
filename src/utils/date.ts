export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function getCurrentMonthLabel(): string {
  return new Date().toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

export function isCurrentMonth(date: string): boolean {
  const target = new Date(date);
  const now = new Date();

  return (
    target.getMonth() === now.getMonth() &&
    target.getFullYear() === now.getFullYear()
  );
}
