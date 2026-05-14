import type { InsertContact } from "../shared/schema";

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getZeptoApiToken(): string {
  const rawToken = getRequiredEnv("ZEPTO_API_TOKEN");

  // Users often paste the full header value from Zepto docs.
  return rawToken.replace(/^Zoho-enczapikey\s+/i, "").trim();
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getZeptoApiUrl() {
  return process.env.ZEPTO_API_URL ?? "https://api.zeptomail.com/v1.1/email";
}

function getErrorMessage(payload: unknown, fallback: string) {
  if (typeof payload === "string" && payload.trim()) {
    return payload;
  }

  if (!payload || typeof payload !== "object") {
    return fallback;
  }

  const record = payload as Record<string, unknown>;

  const nestedError = record.error;
  if (nestedError && typeof nestedError === "object") {
    const nestedRecord = nestedError as Record<string, unknown>;

    for (const key of ["message", "code"]) {
      const value = nestedRecord[key];

      if (typeof value === "string" && value.trim()) {
        return value;
      }
    }

    const details = nestedRecord.details;
    if (Array.isArray(details)) {
      for (const detail of details) {
        if (!detail || typeof detail !== "object") {
          continue;
        }

        const message = (detail as Record<string, unknown>).message;
        if (typeof message === "string" && message.trim()) {
          return message;
        }
      }
    }
  }

  for (const key of ["message", "error", "details"]) {
    const value = record[key];

    if (typeof value === "string" && value.trim()) {
      return value;
    }
  }

  return fallback;
}

function parseJsonSafely(value: string) {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as unknown;
  } catch {
    return value;
  }
}

export async function sendContactEmail(data: InsertContact) {
  const apiUrl = getZeptoApiUrl();
  const apiToken = getZeptoApiToken();
  const fromName = process.env.ZEPTO_MAIL_FROM_NAME ?? "Pharmviah Website";
  const fromAddress = getRequiredEnv("ZEPTO_MAIL_FROM_ADDRESS");
  const to = process.env.ZEPTO_CONTACT_TO ?? "contact@pharmviah.com";
  const toName = process.env.ZEPTO_CONTACT_TO_NAME ?? "Pharmviah";
  const organization = data.organization.trim() || "Not provided";
  const subject = `New contact form submission from ${data.name}`;

  const text = [
    "New contact form submission",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Organization: ${organization}`,
    "",
    "Message:",
    data.message,
  ].join("\n");

  const html = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Organization:</strong> ${escapeHtml(organization)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(data.message).replaceAll("\n", "<br />")}</p>
  `;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Zoho-enczapikey ${apiToken}`,
    },
    body: JSON.stringify({
      from: {
        address: fromAddress,
        name: fromName,
      },
      to: [
        {
          email_address: {
            address: to,
            name: toName,
          },
        },
      ],
      subject,
      textbody: text,
      htmlbody: html,
    }),
    signal: AbortSignal.timeout(10000),
  });

  const responseText = await response.text();
  const responseBody = parseJsonSafely(responseText);

  if (!response.ok) {
    throw new Error(
      getErrorMessage(
        responseBody,
        `Zepto Mail request failed with status ${response.status}.`,
      ),
    );
  }

  if (!responseBody || typeof responseBody !== "object") {
    return;
  }

  const status = (responseBody as Record<string, unknown>).data;

  if (
    Array.isArray(status) &&
    status.some((item) => {
      if (!item || typeof item !== "object") {
        return false;
      }

      return (item as Record<string, unknown>).status === "error";
    })
  ) {
    throw new Error(
      getErrorMessage(responseBody, "Zepto Mail rejected the email request."),
    );
  }
}
