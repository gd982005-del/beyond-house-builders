import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2 } from "lucide-react";

interface ContactFormProps {
  variant?: "contact" | "quote" | "consultation";
}

export function ContactForm({ variant = "contact" }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you within 24 hours.",
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input 
            id="name" 
            name="name" 
            placeholder="John Doe" 
            required 
            className="bg-background"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input 
            id="phone" 
            name="phone" 
            type="tel" 
            placeholder="0791 996448" 
            required 
            className="bg-background"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <Input 
          id="email" 
          name="email" 
          type="email" 
          placeholder="john@example.com" 
          required 
          className="bg-background"
        />
      </div>

      {variant === "consultation" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="service">Service Type *</Label>
            <select
              id="service"
              name="service"
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Select a service</option>
              <option value="ceiling">Ceiling Design</option>
              <option value="cabinetry">Cabinetry</option>
              <option value="walls">Walls & Décor</option>
              <option value="floors">Floors & Tiles</option>
              <option value="full">Full Interior Design</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Preferred Date</Label>
            <Input 
              id="date" 
              name="date" 
              type="date" 
              className="bg-background"
            />
          </div>
        </>
      )}

      {variant === "quote" && (
        <div className="space-y-2">
          <Label htmlFor="service">Service Interested In *</Label>
          <select
            id="service"
            name="service"
            required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">Select a service</option>
            <option value="ceiling">Ceiling Design</option>
            <option value="cabinetry">Cabinetry</option>
            <option value="walls">Walls & Décor</option>
            <option value="floors">Floors & Tiles</option>
            <option value="full">Full Interior Design</option>
          </select>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="message">
          {variant === "quote" ? "Project Details *" : "Message *"}
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder={
            variant === "quote"
              ? "Tell us about your project, budget, and timeline..."
              : "How can we help you?"
          }
          required
          rows={5}
          className="bg-background resize-none"
        />
      </div>

      <Button 
        type="submit" 
        variant="gold" 
        size="lg" 
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            {variant === "quote" ? "Request Quote" : variant === "consultation" ? "Book Consultation" : "Send Message"}
          </>
        )}
      </Button>
    </motion.form>
  );
}
