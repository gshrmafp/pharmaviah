import type { InsertContact } from "@shared/schema";

type ContactApiResponse = {
  success: boolean;
  message: string;
};

export async function sendEmail(data: InsertContact) {
  const response = await fetch("https://api.pharmviah.com/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const payload = (await response
    .json()
    .catch(() => null)) as ContactApiResponse | { message?: string } | null;

  if (!response.ok) {
    throw new Error(payload?.message || "Failed to send your message.");
  }

  return payload;
}
