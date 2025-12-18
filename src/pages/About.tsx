import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Eye, Heart, ArrowRight } from "lucide-react";

import directorImg from "@/assets/director.jpg";
import bedroomImg from "@/assets/portfolio/bedroom-1.jpg";

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for excellence in every project, ensuring the highest quality standards.",
  },
  {
    icon: Heart,
    title: "Integrity",
    description: "Honesty and transparency guide all our client relationships and business practices.",
  },
  {
    icon: Eye,
    title: "Innovation",
    description: "We embrace creative solutions and stay ahead of design trends.",
  },
];

export default function About() {
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
              About Us
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
              Crafting Beautiful Spaces Since Day One
            </h1>
            <p className="text-lg text-muted-foreground">
              Beyond House Interior Construction & Consultancy is dedicated to transforming living and working spaces into extraordinary environments that inspire and delight.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-gold font-medium text-sm tracking-wider uppercase mb-3">
                Our Story
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-6">
                Building Dreams, One Space at a Time
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded with a passion for transforming spaces, Beyond House Interior Construction & Consultancy has grown to become a trusted name in Kenya's interior design industry.
                </p>
                <p>
                  Our journey began with a simple belief: that every space has the potential to be extraordinary. Today, we continue to bring that vision to life for homeowners and businesses across Nairobi and beyond.
                </p>
                <p>
                  With a dedicated team of skilled craftsmen and creative designers, we specialize in ceiling designs, custom cabinetry, wall treatments, and premium flooring solutions. Every project is an opportunity to exceed expectations and create spaces that our clients love.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src={bedroomImg}
                alt="Beautiful interior design"
                className="w-full rounded-lg shadow-elegant"
              />
              <div className="absolute -bottom-6 -left-6 bg-gold text-charcoal p-6 rounded-lg shadow-lg">
                <span className="font-display text-4xl font-bold">100+</span>
                <p className="text-sm font-medium">Projects Completed</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section-padding bg-charcoal text-beige-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-charcoal/50 p-8 rounded-lg border border-beige/10"
            >
              <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center mb-6">
                <Target className="h-7 w-7 text-gold" />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-4">Our Mission</h3>
              <p className="text-beige/80 leading-relaxed">
                To deliver exceptional interior construction and consultancy services that transform ordinary spaces into extraordinary environments, while maintaining the highest standards of quality, creativity, and client satisfaction.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-charcoal/50 p-8 rounded-lg border border-beige/10"
            >
              <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center mb-6">
                <Eye className="h-7 w-7 text-gold" />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-4">Our Vision</h3>
              <p className="text-beige/80 leading-relaxed">
                To be the leading interior construction and consultancy firm in East Africa, recognized for our innovative designs, exceptional craftsmanship, and unwavering commitment to transforming spaces beyond imagination.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Our Values"
            title="What We Stand For"
            description="Our core values guide everything we do, from client interactions to project execution."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-8 rounded-lg text-center shadow-md"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-beige mb-6">
                  <value.icon className="h-8 w-8 text-charcoal" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Director Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-lg">
                <img
                  src={directorImg}
                  alt="Daniel Ochien - Director"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gold rounded-lg -z-10" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-gold font-medium text-sm tracking-wider uppercase mb-3">
                Meet Our Director
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Daniel Ochien
              </h2>
              <p className="text-lg text-gold mb-6">Founder & Director</p>
              <div className="space-y-4 text-muted-foreground mb-8">
                <p>
                  With years of experience in interior construction and design, Daniel founded Beyond House with a vision to deliver exceptional quality and innovative designs to every client.
                </p>
                <p>
                  His hands-on approach and attention to detail ensure that every project meets the highest standards of craftsmanship. Under his leadership, Beyond House has completed over 100 successful projects across Kenya.
                </p>
              </div>
              <Button variant="elegant" size="lg" asChild>
                <Link to="/contact">
                  Get in Touch
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
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
              Let's Work Together
            </h2>
            <p className="text-charcoal/80 text-lg mb-8 max-w-xl mx-auto">
              Ready to transform your space? Contact us today to discuss your project.
            </p>
            <Button variant="elegant" size="lg" asChild>
              <Link to="/consultancy">Book a Consultation</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
