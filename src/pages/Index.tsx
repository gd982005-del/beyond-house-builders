import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/ServiceCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { SectionHeader } from "@/components/SectionHeader";
import { supabase } from "@/integrations/supabase/client";
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
import directorImg from "@/assets/director.jpg";

// Fallback images
import ceilingImg from "@/assets/portfolio/ceiling-1.jpg";
import cabinetryImg from "@/assets/portfolio/cabinetry-1.jpg";
import wallsImg from "@/assets/portfolio/walls-1.jpg";
import tilesImg from "@/assets/portfolio/tiles-1.jpg";

const serviceIcons: Record<string, typeof Layers> = {
  'ceiling-design': Layers,
  'cabinetry': DoorOpen,
  'walls-decor': Palette,
  'floors-tiles': Square,
};

const fallbackImages: Record<string, string> = {
  'ceiling-design': ceilingImg,
  'cabinetry': cabinetryImg,
  'walls-decor': wallsImg,
  'floors-tiles': tilesImg,
};

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

interface Service {
  id: string;
  title: string;
  description: string | null;
  slug: string;
  image_url: string | null;
}

interface Testimonial {
  id: string;
  client_name: string;
  client_role: string | null;
  content: string;
  rating: number | null;
}

interface PortfolioItem {
  id: string;
  image_url: string;
  title: string | null;
}

export default function Index() {
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, testimonialsRes, portfolioRes] = await Promise.all([
          supabase.from('services').select('id, title, description, slug, image_url').eq('is_visible', true).order('display_order').limit(4),
          supabase.from('testimonials').select('id, client_name, client_role, content, rating').eq('is_visible', true).order('display_order').limit(3),
          supabase.from('portfolio').select('id, image_url, title').eq('is_visible', true).order('display_order').limit(4),
        ]);

        if (servicesRes.data) setServices(servicesRes.data);
        if (testimonialsRes.data) setTestimonials(testimonialsRes.data);
        if (portfolioRes.data) setPortfolioItems(portfolioRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
              <ServiceCard 
                key={service.id} 
                title={service.title}
                description={service.description || ''}
                icon={serviceIcons[service.slug] || Layers}
                image={service.image_url || fallbackImages[service.slug] || ceilingImg}
                href={`/services#${service.slug}`}
              />
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
            {portfolioItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-square overflow-hidden rounded-lg group"
              >
                <img
                  src={item.image_url}
                  alt={item.title || 'Portfolio project'}
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
              <TestimonialCard 
                key={testimonial.id} 
                name={testimonial.client_name}
                role={testimonial.client_role || ''}
                content={testimonial.content}
                rating={testimonial.rating || 5}
              />
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
                  alt="Dancan Odhiambo - Director"
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
                Dancan Odhiambo
              </h2>
              <p className="text-lg text-gold mb-6">Founder & Director</p>
              <div className="space-y-4 text-muted-foreground mb-8">
                <p>
                  With years of experience in interior construction and design, Dancan founded Beyond House with a vision to deliver exceptional quality and innovative designs to every client.
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
