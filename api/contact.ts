import type { IncomingMessage } from "http";
import { z } from "zod";
import { insertContactSchema } from "../shared/schema";
import { sendContactEmail } from "../server/email";

type ApiRequest = IncomingMessage & {
  body?: unknown;
  method?: string;
};

type ApiResponse = {
  setHeader(name: string, value: string): void;
  status(code: number): ApiResponse;
  json(body: unknown): void;
};

async function readJsonBody(req: ApiRequest) {
  if (req.body !== undefined) {
    if (typeof req.body === "string") {
      return req.body ? JSON.parse(req.body) : {};
    }

    return req.body;
  }

  const chunks: Uint8Array[] = [];

  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  const rawBody = Buffer.concat(chunks).toString("utf-8");
  return rawBody ? JSON.parse(rawBody) : {};
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed." });
  }

  try {
    const body = await readJsonBody(req);
    const contactData = insertContactSchema.parse(body);

    await sendContactEmail(contactData);

    return res.status(200).json({
      success: true,
      message: "Message received successfully.",
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return res.status(400).json({
        message: "Request body must be valid JSON.",
      });
    }

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Please check the contact form fields and try again.",
        errors: error.flatten(),
      });
    }

    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    return res.status(500).json({ message });
  }
}
