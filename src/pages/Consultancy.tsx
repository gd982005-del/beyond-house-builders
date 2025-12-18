import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { SectionHeader } from "@/components/SectionHeader";
import { ContactForm } from "@/components/ContactForm";
import { MessageSquare, Lightbulb, Hammer, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Consultation",
    description: "We start with an in-depth discussion about your vision, requirements, and budget to understand your needs.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Design & Planning",
    description: "Our team creates detailed designs and plans, presenting options that align with your style and space.",
  },
  {
    number: "03",
    icon: Hammer,
    title: "Execution",
    description: "Our skilled craftsmen bring the designs to life with precision and quality craftsmanship.",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Final Delivery",
    description: "We complete the project with finishing touches and ensure your complete satisfaction.",
  },
];

export default function Consultancy() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block text-gold font-medium text-sm tracking-wider uppercase mb-3">
              Consultancy
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
              Book a Consultation
            </h1>
            <p className="text-lg text-muted-foreground">
              Start your interior transformation journey with a personalized consultation. Our experts will guide you through the entire process.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Our Process"
            title="How We Work"
            description="A streamlined approach that takes your project from concept to completion."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-border" />
                )}
                
                <div className="relative bg-card p-8 rounded-lg shadow-md text-center">
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-charcoal text-sm font-bold px-4 py-1 rounded-full">
                    {step.number}
                  </span>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-beige mt-4 mb-6">
                    <step.icon className="h-8 w-8 text-charcoal" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-gold font-medium text-sm tracking-wider uppercase mb-3">
                Get Started
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-6">
                Schedule Your Free Consultation
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form and we'll get back to you within 24 hours to confirm your consultation appointment.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                    <CheckCircle className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Free Initial Consultation</h4>
                    <p className="text-sm text-muted-foreground">No obligation - discuss your ideas and get expert advice.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                    <CheckCircle className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">On-Site Assessment</h4>
                    <p className="text-sm text-muted-foreground">We'll visit your space to take measurements and assess requirements.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                    <CheckCircle className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Detailed Quote</h4>
                    <p className="text-sm text-muted-foreground">Receive a comprehensive quote with clear pricing breakdown.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card p-8 rounded-lg shadow-elegant"
            >
              <ContactForm variant="consultation" />
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
