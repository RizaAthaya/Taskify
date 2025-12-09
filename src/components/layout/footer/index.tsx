import { Icon } from "@iconify/react";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-4 px-6 md:px-12 text-sm text-gray-600 flex flex-col md:flex-row gap-1 items-center justify-between">
      {/* Left - Copyright */}
      <div className="text-sm md:text-base flex items-center gap-1.5">
        <Icon icon="mdi:copyright" className="w-4 h-4" />
        <span>{new Date().getFullYear()} Taskify. All rights reserved.</span>
      </div>

      {/* Right - Contact */}
      <a
        href="mailto:athayarizaaa@gmail.com"
        className="text-sm md:text-base flex items-center gap-1.5 text-gray-600 hover:text-purple-600 transition"
      >
        <Icon icon="mdi:email" className="w-4 h-4" />
        <span>athayarizaaa@gmail.com</span>
      </a>
    </footer>
  );
};

export default Footer;
