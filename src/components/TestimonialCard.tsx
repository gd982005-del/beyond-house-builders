import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating?: number;
}

export function TestimonialCard({ name, role, content, rating = 5 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-card p-8 rounded-lg shadow-md relative"
    >
      <Quote className="absolute top-6 right-6 h-10 w-10 text-gold/20" />
      
      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-gold text-gold" />
        ))}
      </div>
      
      <p className="text-muted-foreground leading-relaxed mb-6 italic">
        "{content}"
      </p>
      
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-beige flex items-center justify-center">
          <span className="font-display text-lg font-semibold text-charcoal">
            {name.charAt(0)}
          </span>
        </div>
        <div>
          <h4 className="font-medium text-foreground">{name}</h4>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}
