import { useMutation } from "@tanstack/react-query";
import { type InsertContact } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

// Frontend-only demo implementation
export function useContactForm() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertContact) => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // In a real app, this would use the hook below:
      // const res = await apiRequest("POST", api.contact.submit.path, data);
      // return res.json();
      
      console.log("Form submitted successfully:", data);
      return { success: true, message: "Message sent successfully" };
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We will get back to you shortly.",
        variant: "default",
        className: "bg-primary text-primary-foreground border-primary"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      console.error("Submission error:", error);
    }
  });
}
