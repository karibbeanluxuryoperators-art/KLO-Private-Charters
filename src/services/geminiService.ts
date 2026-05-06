export async function chatWithConcierge(history: { role: "user" | "model", parts: { text: string }[] }[]) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ history }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error || `Request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.text as string;
}
