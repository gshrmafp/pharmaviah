import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "../shared/schema";
import { sendContactEmail } from "./email";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      await storage.createContact(contactData);
      await sendContactEmail(contactData);

      res.json({
        success: true,
        message: "Message received successfully.",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Please check the contact form fields and try again.",
          errors: error.flatten(),
        });
      } else {
        const message =
          error instanceof Error ? error.message : "Internal Server Error";

        res.status(500).json({ message });
      }
    }
  });

  return httpServer;
}
