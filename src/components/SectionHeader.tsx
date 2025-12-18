import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  children?: ReactNode;
}

export function SectionHeader({ 
  title, 
  subtitle, 
  description, 
  align = "center",
  dark = false,
  children 
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-12 md:mb-16 ${align === "center" ? "text-center" : "text-left"}`}
    >
      {subtitle && (
        <span className="inline-block text-gold font-medium text-sm tracking-wider uppercase mb-3">
          {subtitle}
        </span>
      )}
      <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 ${
        dark ? "text-beige-light" : "text-foreground"
      }`}>
        {title}
      </h2>
      {description && (
        <p className={`text-lg max-w-2xl ${align === "center" ? "mx-auto" : ""} ${
          dark ? "text-beige/80" : "text-muted-foreground"
        }`}>
          {description}
        </p>
      )}
      {children}
    </motion.div>
  );
}
