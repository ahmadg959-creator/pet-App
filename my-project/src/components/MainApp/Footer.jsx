
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white/80 border-t border-slate-200 mt-auto py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500">
        <p className="mb-2 font-semibold text-teal-accent">Made with ❤️ for Pets and Their Humans.</p>
        <div className="flex flex-wrap justify-center items-center gap-y-2 gap-x-2 sm:gap-x-4">
          <span>© 2025 PetWorld</span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <a href="#" className="hover:text-slate-800 transition-colors">About</a>
          <span className="hidden sm:inline text-slate-300">|</span>
          <a href="#" className="hover:text-slate-800 transition-colors">Contact</a>
          <span className="hidden sm:inline text-slate-300">|</span>
          <a href="#" className="hover:text-slate-800 transition-colors">Terms</a>
          <span className="hidden sm:inline text-slate-300">|</span>
          <a href="#" className="hover:text-slate-800 transition-colors">Privacy</a>
          <span className="hidden sm:inline text-slate-300">|</span>
          <a href="#" className="hover:text-slate-800 transition-colors">Help Center</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
