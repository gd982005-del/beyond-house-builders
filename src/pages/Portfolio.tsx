import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import ceilingImg from "@/assets/portfolio/ceiling-1.jpg";
import cabinetryImg from "@/assets/portfolio/cabinetry-1.jpg";
import wardrobeImg from "@/assets/portfolio/wardrobe-1.jpg";
import wallsImg from "@/assets/portfolio/walls-1.jpg";
import tilesImg from "@/assets/portfolio/tiles-1.jpg";
import kitchenImg from "@/assets/portfolio/kitchen-1.jpg";
import kitchen2Img from "@/assets/portfolio/kitchen-2.jpg";
import bedroomImg from "@/assets/portfolio/bedroom-1.jpg";

const categories = ["All", "Ceiling", "Cabinetry", "Walls", "Floors"];

const projects = [
  { id: 1, src: ceilingImg, alt: "Modern ceiling design with LED lighting", category: "Ceiling" },
  { id: 2, src: cabinetryImg, alt: "Custom wardrobe with shelving", category: "Cabinetry" },
  { id: 3, src: kitchenImg, alt: "Modern kitchen cabinets", category: "Cabinetry" },
  { id: 4, src: kitchen2Img, alt: "L-shaped kitchen design", category: "Cabinetry" },
  { id: 5, src: wallsImg, alt: "Wood slat wall with LED accent", category: "Walls" },
  { id: 6, src: bedroomImg, alt: "Elegant bedroom wall design", category: "Walls" },
  { id: 7, src: tilesImg, alt: "Marble tile bathroom", category: "Floors" },
  { id: 8, src: wardrobeImg, alt: "Built-in wardrobe with mirror", category: "Cabinetry" },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((project) => project.category === activeCategory);

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
              Our Portfolio
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
              Our Recent Work
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore our collection of completed projects showcasing our craftsmanship and attention to detail.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-charcoal text-beige-light"
                    : "bg-muted text-foreground hover:bg-beige"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                onClick={() => setSelectedImage(project.src)}
              >
                <img
                  src={project.src}
                  alt={project.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/60 transition-all duration-300 flex items-center justify-center">
                  <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <span className="inline-block bg-gold text-charcoal px-4 py-2 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                    <p className="text-beige-light mt-3 text-sm px-4">
                      {project.alt}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.img
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            src={selectedImage}
            alt="Full size project"
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
          />
          <button
            className="absolute top-6 right-6 text-beige-light hover:text-gold transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      )}

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
              Want Similar Results?
            </h2>
            <p className="text-charcoal/80 text-lg mb-8 max-w-xl mx-auto">
              Let us bring the same quality and attention to detail to your space.
            </p>
            <Button variant="elegant" size="lg" asChild>
              <Link to="/contact">Start Your Project</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
