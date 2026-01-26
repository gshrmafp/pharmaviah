import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Mail, MapPin, Phone, Send, CheckCircle2, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { sendEmail, openWhatsApp } from "@/lib/emailService";
import { useToast } from "@/hooks/use-toast";

export function Contact() {
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      organization: "",
      message: "",
    },
  });

  const onSubmit = async (data: InsertContact) => {
    // Honeypot check (assuming a field named 'subject' as honeypot if added, 
    // but here we just follow the standard pattern)
    setIsSending(true);
    try {
      await sendEmail(data);
      setIsSuccess(true);
      toast({
        title: "Message Sent",
        description: "We have received your request and will get back to you soon.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or use WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleWhatsApp = () => {
    const data = form.getValues();
    openWhatsApp(data);
  };

  const resetForm = () => {
    form.reset();
    setIsSuccess(false);
  };

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-border">
          
          {/* Contact Info Side */}
          <div className="bg-primary p-12 text-primary-foreground flex flex-col justify-between relative overflow-hidden">
             {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-6">Get in Touch</h3>
              <p className="text-primary-foreground/80 mb-12">
                Ready to elevate your compliance standards? Fill out the form or contact us directly.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/60">Email</p>
                    <p className="font-medium">contact@pharmaconsult.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/60">Phone</p>
                    <p className="font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/60">Office</p>
                    <p className="font-medium">101 Compliance Way, Tech Park</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 text-sm text-primary-foreground/60">
              Available Mon-Fri, 9am - 6pm EST
            </div>
          </div>

          {/* Form Side */}
          <div className="p-8 md:p-12 min-h-[600px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center space-y-6"
                >
                  <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold text-primary">Thank You!</h4>
                    <p className="text-slate-600">Your message has been sent successfully. We will contact you shortly.</p>
                  </div>
                  <div className="flex flex-col gap-3 pt-4">
                    <Button 
                      onClick={handleWhatsApp}
                      className="w-full h-12 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold flex gap-2"
                    >
                      <MessageSquare className="w-5 h-5" />
                      Send Request on WhatsApp
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={resetForm}
                      className="w-full h-12"
                    >
                      Send Another Message
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      {/* Honeypot field - hidden from users */}
                      <div className="hidden">
                        <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" />
                      </div>

                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary font-semibold">Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" className="h-12 bg-slate-50 border-slate-200 focus:border-secondary focus:ring-secondary/10" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary font-semibold">Email</FormLabel>
                              <FormControl>
                                <Input placeholder="john@company.com" className="h-12 bg-slate-50 border-slate-200 focus:border-secondary focus:ring-secondary/10" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="organization"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary font-semibold">Organization</FormLabel>
                              <FormControl>
                                <Input placeholder="Company Name" className="h-12 bg-slate-50 border-slate-200 focus:border-secondary focus:ring-secondary/10" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary font-semibold">Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="How can we help you?" 
                                className="min-h-[120px] bg-slate-50 border-slate-200 focus:border-secondary focus:ring-secondary/10 resize-none" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        disabled={isSending}
                        className="w-full h-12 text-base font-semibold bg-secondary hover:bg-secondary/90 shadow-lg shadow-secondary/20 transition-all hover:scale-[1.01] flex gap-2"
                      >
                        {isSending ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <Send className="w-4 h-4" />
                            </motion.div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                  <div className="mt-4 text-center">
                    <p className="text-xs text-slate-400 italic">This form is for demonstration only. Email and WhatsApp features are active.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
