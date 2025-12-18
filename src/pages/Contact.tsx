import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { ContactForm } from "@/components/ContactForm";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    content: "0791 996448",
    href: "tel:+254791996448",
  },
  {
    icon: Mail,
    title: "Email",
    content: "Beyondhouseint@gmail.com",
    href: "mailto:Beyondhouseint@gmail.com",
  },
  {
    icon: MapPin,
    title: "Location",
    content: "Nairobi, Kenya",
    href: "https://maps.google.com/?q=Nairobi,Kenya",
  },
  {
    icon: Clock,
    title: "Working Hours",
    content: "Mon - Sat: 8AM - 6PM",
    href: null,
  },
];

export default function Contact() {
  const whatsappNumber = "254791996448";
  const whatsappMessage = encodeURIComponent("Hello! I'm interested in your interior design services.");

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
              Contact Us
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
              Get In Touch
            </h1>
            <p className="text-lg text-muted-foreground">
              Ready to transform your space? Reach out to us and let's discuss your project.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <h2 className="font-display text-2xl font-semibold text-foreground mb-8">
                Contact Information
              </h2>
              
              <div className="space-y-6 mb-8">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-beige flex items-center justify-center shrink-0">
                      <info.icon className="h-5 w-5 text-charcoal" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">{info.title}</h4>
                      {info.href ? (
                        <a
                          href={info.href}
                          target={info.href.startsWith("http") ? "_blank" : undefined}
                          rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-muted-foreground hover:text-gold transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-primary-foreground px-6 py-4 rounded-lg font-medium transition-colors w-full justify-center"
              >
                <MessageCircle className="h-6 w-6" />
                Chat on WhatsApp
              </a>

              {/* Map */}
              <div className="mt-8 rounded-lg overflow-hidden shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255282.3586169498!2d36.68219254!3d-1.3028617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2s!4v1702900000000!5m2!1sen!2s"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Beyond House Location"
                />
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-card p-8 md:p-10 rounded-lg shadow-elegant">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                  Send Us a Message
                </h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
                <ContactForm variant="quote" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
