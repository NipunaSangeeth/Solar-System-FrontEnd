import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-50 pt-16 pb-8 border-t border-gray-200 mt-0">
      <div className="px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Column 1: Brand Info */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center">
              <img
                src="/assets/images/image.png"
                alt="SanSolar - Ultimate Energy Solutions"
                className="h-12 w-auto object-contain drop-shadow-sm"
              />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Power in Focus. Revolutionizing solar energy management through advanced monitoring
              technology and predictive insights.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <button className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                <Facebook className="h-5 w-5" />
              </button>
              <button className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                <Twitter className="h-5 w-5" />
              </button>
              <button className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                <Linkedin className="h-5 w-5" />
              </button>
              <button className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                <Github className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div className="flex flex-col gap-6">
            <h3 className="font-bold text-gray-900 text-[17px]">Solutions</h3>
            <ul className="flex flex-col gap-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Digital Twin Platform</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Predictive Analytics</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Remote Monitoring</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Performance Optimization</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Real-time Alerts</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Maintenance Planning</a></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="flex flex-col gap-6">
            <h3 className="font-bold text-gray-900 text-[17px]">Resources</h3>
            <ul className="flex flex-col gap-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">White Papers</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Support Center</a></li>
            </ul>
          </div>

          {/* Column 4: Get in Touch & Newsletter */}
          <div className="flex flex-col gap-6">
            <h3 className="font-bold text-gray-900 text-[17px]">Get in Touch</h3>
            <ul className="flex flex-col gap-4 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-lime-500 shrink-0 mt-0.5" />
                <span className="leading-snug">123 Innovation Drive<br />Energy Tech Park<br />Copenhagen, Denmark</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-lime-500 shrink-0" />
                <span>+45 33 22 11 00</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-lime-500 shrink-0" />
                <span>contact@sansolar.com</span>
              </li>
            </ul>

            <div className="mt-2">
              <h4 className="font-bold text-gray-900 text-[15px] mb-3">Stay Updated</h4>
              <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-white text-sm"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Cookie Policy</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Accessibility</a>
          </div>
          <p>© 2025 SanSolar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
