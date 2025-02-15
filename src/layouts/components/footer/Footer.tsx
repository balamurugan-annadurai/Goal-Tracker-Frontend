import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              GoalTracker
            </h3>
            <p className="text-gray-600">
              Empowering you to achieve your dreams, one goal at a time.
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-[#10B981]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-600 hover:text-[#10B981]">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-600 hover:text-[#10B981]">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-600 hover:text-[#10B981]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-[#10B981]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-600 hover:text-[#10B981]">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-4">
              Connect With Us
            </h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-[#10B981]">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-[#10B981]">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-[#10B981]">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-[#10B981]">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} GoalTracker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
