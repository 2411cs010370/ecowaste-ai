import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail, MapPin, Phone, Twitter, Instagram } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xl font-bold">♻ <span className="eco-gradient-text">EcoWaste AI</span></p>
          <p className="mt-3 text-sm text-muted-foreground">
            A final-year engineering project using deep learning to classify waste and promote sustainable disposal.
          </p>
        </div>
        <div>
          <h4 className="font-semibold">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/detect" className="hover:text-primary">Detect Waste</Link></li>
            <li><Link to="/dashboard" className="hover:text-primary">Dashboard</Link></li>
            <li><Link to="/analytics" className="hover:text-primary">Analytics</Link></li>
            <li><Link to="/admin" className="hover:text-primary">Admin Panel</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><Mail className="size-4 text-primary" /> team@ecowaste.ai</li>
            <li className="flex gap-2"><Phone className="size-4 text-primary" /> <a href="tel:+917032989461" className="hover:text-primary transition-colors">+91 70329 89461</a></li>
            <li className="flex gap-2"><MapPin className="size-4 text-primary" /> Hyderabad, India</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Follow us</h4>
          <div className="mt-3 flex gap-3">
            {[Github, Linkedin, Twitter, Instagram].map((I, i) => (
              <a key={i} href="#" aria-label="social" className="lift rounded-full bg-card p-2.5 text-primary">
                <I className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © 2026 EcoWaste AI · AI-Powered Sustainable Waste Management using Deep Learning
      </p>
    </footer>
  );
}
