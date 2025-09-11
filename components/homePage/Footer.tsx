import Link from "next/link";
import { Github, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-green-700 dark:bg-green-900 text-white py-12 mt-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + About */}
        <div>
          <h3 className="text-2xl font-bold mb-4">🌱 Digital Krishi Officer</h3>
          <p className="text-gray-200 text-sm leading-relaxed">
            Always available, always learning, and always farmer-first.  
            Bringing AI-powered farming support to every hand.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li>
              <Link href="/ask" className="hover:underline">
                Ask a Question
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:underline">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
          <div className="flex gap-4">
            <Link
              href="https://github.com"
              target="_blank"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <Twitter className="w-5 h-5" />
            </Link>
            <Link
              href="https://facebook.com"
              target="_blank"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <Facebook className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 mt-10 pt-6 text-center text-gray-200 text-sm">
        © {new Date().getFullYear()} Digital Krishi Officer. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
