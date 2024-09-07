import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-5">
        {/* Logo and Brand */}
        <div className="flex flex-col lg:items-center">
          <img src="https://raw.githubusercontent.com/MorshedSiam03/FurniFlex/619e205aa49582dce5221ef393d7f8b8ac7d0325/src/assets/Icon/Dark_Logo.svg" className='w-40' alt="" />
        </div>

        {/* About Us Links */}
        <div className='lg:ml-32 ml-8'>
          <h5 className="font-bold mb-4 text-justify">About US</h5>
          <ul className="space-y-2 font-semibold text-[#81859F] text-justify">
            <li><a href="#" className="hover:underline">Master Plan</a></li>
            <li><a href="#" className="hover:underline">Jobs</a></li>
            <li><a href="#" className="hover:underline">Invest</a></li>
            <li><a href="#" className="hover:underline">Pressroom</a></li>
            <li><a href="#" className="hover:underline">Blog</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Explore EEVE Links */}
        <div className='ml-8 md:ml-0 md:mr-12 lg:ml-8 lg:mr-0'>
          <h5 className="font-bold mb-4 text-justify">Explore EEVE</h5>
          <ul className="space-y-2 font-semibold text-[#81859F] text-justify">
            <li><a href="#" className="hover:underline">Unlock my Robot Power</a></li>
            <li><a href="#" className="hover:underline">Starlight</a></li>
            <li><a href="#" className="hover:underline">Robot Platform</a></li>
            <li><a href="#" className="hover:underline">EEVE Roadmap</a></li>
          </ul>
        </div>

        {/* Community & Support Links */}
        <div className='ml-8 md:ml-0'>
          <h5 className="font-bold mb-4 text-justify">Community & Support</h5>
          <ul className="space-y-2 font-semibold text-[#81859F] text-justify">
            <li><a href="#" className="hover:underline">Willow X Community</a></li>
            <li><a href="#" className="hover:underline">Developer & Maker Access</a></li>
            <li><a href="#" className="hover:underline">Special Cases</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4">
        <div className="container mx-auto px-5 flex flex-col md:flex-row justify-between items-center text-sm">
          {/* Left-side Links */}
          <div className="container mx-auto my-4 px-5 flex space-x-6">
          <a href="#"><img src="https://raw.githubusercontent.com/MorshedSiam03/FurniFlex/7d5128be8cbd4911a76d89da31a0ed56e99c6d36/src/assets/Icon/facebook.svg" alt="Facebook" className="w-5 h-5" /></a>
          <a href="#"><img src="https://raw.githubusercontent.com/MorshedSiam03/FurniFlex/7d5128be8cbd4911a76d89da31a0ed56e99c6d36/src/assets/Icon/instagram.svg" alt="Instagram" className="w-5 h-5" /></a>
          <a href="#"><img src="https://raw.githubusercontent.com/MorshedSiam03/FurniFlex/7d5128be8cbd4911a76d89da31a0ed56e99c6d36/src/assets/Icon/new-twitter.svg" alt="X" className="w-5 h-5" /></a>
          <a href="#"><img src="https://raw.githubusercontent.com/MorshedSiam03/FurniFlex/7d5128be8cbd4911a76d89da31a0ed56e99c6d36/src/assets/Icon/linkedin.svg" alt="LinkedIn" className="w-5 h-5" /></a>
        </div>
          

          {/* Right-side Country & Language */}
          <div className="flex text-[#81859F] space-x-2 font-semibold my-4 md:my-0">
            <img src="https://raw.githubusercontent.com/MorshedSiam03/FurniFlex/main/src/assets/Icon/united-states-flag-free-png.webp" alt="United States" className="w-7" />
            <p>United States (English)</p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="space-x-4 text-[#81859F] flex justify-center font-semibold mb-4 md:mb-0">
            <a href="#" className="hover:underline">March22 Recap</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">General Terms</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>

        {/* Copyright Text */}
        <div className="container text-[#323544] font-semibold mx-auto px-2 mt-4 text-center  text-sm">
          EEVE © 2024. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
