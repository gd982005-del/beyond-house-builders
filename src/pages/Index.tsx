import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/ServiceCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { SectionHeader } from "@/components/SectionHeader";
import { 
  ArrowRight, 
  Layers, 
  DoorOpen, 
  Palette, 
  Square,
  Award,
  Users,
  Lightbulb,
  Clock
} from "lucide-react";

import heroImage from "@/assets/hero-interior.jpg";
import ceilingImg from "@/assets/portfolio/ceiling-1.jpg";
import cabinetryImg from "@/assets/portfolio/cabinetry-1.jpg";
import wallsImg from "@/assets/portfolio/walls-1.jpg";
import tilesImg from "@/assets/portfolio/tiles-1.jpg";
import kitchenImg from "@/assets/portfolio/kitchen-1.jpg";
import bedroomImg from "@/assets/portfolio/bedroom-1.jpg";
import wardrobeImg from "@/assets/portfolio/wardrobe-1.jpg";
import kitchen2Img from "@/assets/portfolio/kitchen-2.jpg";

const services = [
  {
    title: "Ceiling Design",
    description: "Transform your space with stunning ceiling designs featuring LED lighting, gypsum work, and modern architectural elements.",
    icon: Layers,
    image: ceilingImg,
    href: "/services#ceiling",
  },
  {
    title: "Cabinetry",
    description: "Custom-built wardrobes, kitchen cabinets, and storage solutions designed to maximize space and style.",
    icon: DoorOpen,
    image: cabinetryImg,
    href: "/services#cabinetry",
  },
  {
    title: "Walls & Décor",
    description: "Beautiful wall treatments including wood paneling, textures, accent walls, and decorative finishes.",
    icon: Palette,
    image: wallsImg,
    href: "/services#walls",
  },
  {
    title: "Floors & Tiles",
    description: "Premium flooring solutions from elegant tiles to wooden floors, transforming the foundation of your space.",
    icon: Square,
    image: tilesImg,
    href: "/services#floors",
  },
];

const features = [
  {
    icon: Award,
    title: "Quality Craftsmanship",
    description: "Premium materials and expert workmanship in every project.",
  },
  {
    icon: Users,
    title: "Professional Expertise",
    description: "Experienced team of designers and skilled craftsmen.",
  },
  {
    icon: Lightbulb,
    title: "Creative Solutions",
    description: "Innovative designs tailored to your unique vision.",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description: "Projects completed on schedule without compromising quality.",
  },
];

const testimonials = [
  {
    name: "Sarah Wanjiku",
    role: "Homeowner, Karen",
    content: "Beyond House transformed our living room beyond our expectations. The ceiling design and custom cabinets are absolutely stunning. Highly recommend their services!",
    rating: 5,
  },
  {
    name: "James Omondi",
    role: "Property Developer",
    content: "Professional, reliable, and creative. They've completed multiple projects for us and the quality is consistently excellent. Our clients love the finished spaces.",
    rating: 5,
  },
  {
    name: "Grace Muthoni",
    role: "Homeowner, Kileleshwa",
    content: "The team was incredibly patient with our design requests. The kitchen remodel exceeded our expectations. Beautiful work and great attention to detail.",
    rating: 5,
  },
];

const portfolioImages = [
  { src: kitchenImg, alt: "Modern kitchen design" },
  { src: bedroomImg, alt: "Elegant bedroom interior" },
  { src: wardrobeImg, alt: "Custom wardrobe" },
  { src: kitchen2Img, alt: "Contemporary kitchen" },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Modern interior design" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 leading-tight">
              Beyond House
              <span className="block text-gold mt-2">Interior Construction</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto font-light">
              Transforming Your Space Beyond Imagination
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gold" size="xl" asChild>
                <Link to="/services">
                  View Services
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/contact">Request a Quote</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-primary-foreground/40 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-primary-foreground/60 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="What We Offer"
            title="Our Services"
            description="From ceilings to floors, we deliver comprehensive interior solutions tailored to your needs."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Why Beyond House"
            title="Why Choose Us"
            description="We bring your vision to life with expertise, creativity, and dedication to excellence."
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-beige mb-6">
                  <feature.icon className="h-8 w-8 text-charcoal" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview Section */}
      <section className="section-padding bg-charcoal">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Our Work"
            title="Recent Projects"
            description="Explore our portfolio of stunning interior transformations."
            dark
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {portfolioImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-square overflow-hidden rounded-lg group"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <Button variant="gold" size="lg" asChild>
              <Link to="/portfolio">
                View Full Portfolio
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Testimonials"
            title="What Our Clients Say"
            description="Don't just take our word for it — hear from our satisfied clients."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-beige">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-charcoal mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-charcoal/80 text-lg mb-8 max-w-xl mx-auto">
              Let's discuss your project and bring your vision to life. Contact us today for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="elegant" size="lg" asChild>
                <Link to="/consultancy">Book Consultation</Link>
              </Button>
              <Button variant="elegant-outline" size="lg" asChild>
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
