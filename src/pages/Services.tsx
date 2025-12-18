import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";

import ceilingImg from "@/assets/portfolio/ceiling-1.jpg";
import cabinetryImg from "@/assets/portfolio/cabinetry-1.jpg";
import wardrobeImg from "@/assets/portfolio/wardrobe-1.jpg";
import wallsImg from "@/assets/portfolio/walls-1.jpg";
import tilesImg from "@/assets/portfolio/tiles-1.jpg";
import kitchenImg from "@/assets/portfolio/kitchen-1.jpg";

const services = [
  {
    id: "ceiling",
    title: "Ceiling Design",
    subtitle: "Elevate Your Space",
    description: "Transform your rooms with stunning ceiling designs that add depth, character, and modern elegance. Our expert craftsmen create custom ceiling solutions that become the focal point of any space.",
    image: ceilingImg,
    features: [
      "Custom gypsum ceiling designs",
      "LED strip and cove lighting integration",
      "Geometric and architectural patterns",
      "Coffered and tray ceiling designs",
      "Sound-absorbing acoustic ceilings",
      "Professional installation and finishing",
    ],
  },
  {
    id: "cabinetry",
    title: "Custom Cabinetry",
    subtitle: "Storage Solutions Redefined",
    description: "From kitchen cabinets to wardrobes, we design and build custom storage solutions that maximize space while adding beauty to your home. Every piece is crafted with precision and built to last.",
    image: cabinetryImg,
    secondaryImage: wardrobeImg,
    features: [
      "Custom kitchen cabinets",
      "Built-in wardrobes and closets",
      "Bathroom vanities and storage",
      "Entertainment centers and shelving",
      "Office and study furniture",
      "Premium hardware and finishes",
    ],
  },
  {
    id: "walls",
    title: "Walls & Décor",
    subtitle: "Express Your Style",
    description: "Create stunning accent walls and decorative finishes that reflect your personality. We specialize in a variety of wall treatments from wood paneling to textured finishes that transform ordinary walls into works of art.",
    image: wallsImg,
    features: [
      "Wood slat and panel walls",
      "PVC and WPC wall panels",
      "Textured paint finishes",
      "Decorative molding and trim",
      "Accent wall designs",
      "Mirror and glass installations",
    ],
  },
  {
    id: "floors",
    title: "Floors & Tiles",
    subtitle: "Foundation of Beauty",
    description: "The right flooring sets the foundation for your entire interior design. We offer expert installation of premium tiles, wooden floors, and various flooring solutions that combine durability with aesthetic appeal.",
    image: tilesImg,
    secondaryImage: kitchenImg,
    features: [
      "Ceramic and porcelain tiles",
      "Marble and granite flooring",
      "Engineered and solid hardwood",
      "Vinyl and laminate options",
      "Bathroom and kitchen tiling",
      "Professional grouting and finishing",
    ],
  },
];

export default function Services() {
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
              Our Services
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
              Comprehensive Interior Solutions
            </h1>
            <p className="text-lg text-muted-foreground">
              From ceilings to floors, we offer end-to-end interior construction services that transform your space into something extraordinary.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Sections */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`section-padding ${index % 2 === 0 ? "bg-background" : "bg-muted"}`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
              index % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}>
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={index % 2 === 1 ? "lg:order-2" : ""}
              >
                <span className="inline-block text-gold font-medium text-sm tracking-wider uppercase mb-3">
                  {service.subtitle}
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-6">
                  {service.title}
                </h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-gold" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button variant="gold" size="lg" asChild>
                  <Link to="/contact">
                    Get This Service
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
              
              {/* Images */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}
              >
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full rounded-lg shadow-elegant"
                  />
                  {service.secondaryImage && (
                    <img
                      src={service.secondaryImage}
                      alt={`${service.title} secondary`}
                      className="absolute -bottom-8 -right-8 w-1/2 rounded-lg shadow-lg border-4 border-background hidden md:block"
                    />
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-20 bg-charcoal text-beige-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-beige/80 text-lg mb-8 max-w-xl mx-auto">
              Book a free consultation and let's discuss how we can transform your space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gold" size="lg" asChild>
                <Link to="/consultancy">Book Consultation</Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <Link to="/portfolio">View Portfolio</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
