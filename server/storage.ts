import { type ContactMessage, type InsertContact } from "@shared/schema";

export interface IStorage {
  createContact(contact: InsertContact): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private contacts: Map<number, ContactMessage>;
  private currentId: number;

  constructor() {
    this.contacts = new Map();
    this.currentId = 1;
  }

  async createContact(insertContact: InsertContact): Promise<ContactMessage> {
    const id = this.currentId++;
    const contact: ContactMessage = { ...insertContact, id };
    this.contacts.set(id, contact);
    return contact;
  }
}

export const storage = new MemStorage();
