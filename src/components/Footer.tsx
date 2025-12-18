import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Consultancy", path: "/consultancy" },
  { name: "Contact", path: "/contact" },
];

const services = [
  { name: "Ceiling Design", path: "/services#ceiling" },
  { name: "Cabinetry", path: "/services#cabinetry" },
  { name: "Walls & Décor", path: "/services#walls" },
  { name: "Floors & Tiles", path: "/services#floors" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappNumber = "254791996448";
  const whatsappMessage = encodeURIComponent("Hello! I'm interested in your interior design services.");

  return (
    <footer className="bg-charcoal text-beige-light">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img 
                src="/logo.png" 
                alt="Beyond House" 
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-beige/80 text-sm leading-relaxed mb-6">
              Transforming spaces beyond imagination. We deliver premium interior construction and consultancy services across Kenya.
            </p>
            {/* WhatsApp Button */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-primary-foreground px-5 py-3 rounded-lg font-medium transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-gold">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-beige/80 hover:text-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-gold">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.path}>
                  <Link
                    to={service.path}
                    className="text-beige/80 hover:text-gold transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-gold">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <span className="text-beige/80 text-sm">Nairobi, Kenya</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <a href="tel:+254791996448" className="text-beige/80 hover:text-gold transition-colors text-sm">
                  0791 996448
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <a href="mailto:Beyondhouseint@gmail.com" className="text-beige/80 hover:text-gold transition-colors text-sm break-all">
                  Beyondhouseint@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-beige/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-beige/60">
            <p>© {currentYear} Beyond House Interior Construction & Consultancy. All rights reserved.</p>
            <p>
              Developed by{" "}
              <a 
                href="https://javalab.co.ke" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gold hover:text-gold-light transition-colors font-medium"
              >
                JavaLab
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
