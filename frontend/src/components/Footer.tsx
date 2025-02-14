import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 text-center">
      <div className="container mx-auto">
        <p className="text-sm">
          &copy; 2025 HaeJo Platform. All Rights Reserved.
        </p>
        <div className="mt-2 space-x-4">
          <a href="/terms" className="hover:text-white">
            이용약관
          </a>
          <a href="/privacy" className="hover:text-white">
            개인정보 처리방침
          </a>
          <a href="/contact" className="hover:text-white">
            문의하기
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
