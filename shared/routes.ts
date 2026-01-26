import { z } from 'zod';
import { insertContactSchema } from './schema';

// "Frontend ONLY" - No real API endpoints required, but we define the contract for structure.
// The frontend will handle form submission locally (demo mode).

export const api = {
  // Mock endpoint definition for structure
  contact: {
    submit: {
      method: 'POST' as const,
      path: '/api/contact',
      input: insertContactSchema,
      responses: {
        200: z.object({ success: z.boolean(), message: z.string() }),
      },
    },
  },
};
