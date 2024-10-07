import React from 'react';
import { useSelector } from 'react-redux';

function Footer() {
  const currentTheme = useSelector((state) => state.theme.theme);

  return (
    <footer
      className={`fixed bottom-0 w-full p-4 flex justify-end items-center ${
        currentTheme === 'light' ? 'bg-gray-300' : 'bg-blue-900'
      }`}
    >
      <a
        href="https://github.com/CarnageX19/Study-Timer/"
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center space-x-2 text-sm ${
          currentTheme === 'light' ? 'text-black' : 'text-white'
        } hover:text-orange-600`}
      >
        Source Code &nbsp;
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
          />
        </svg>
        <span>Created by Aritra</span>
      </a>
    </footer>
  );
}

export default Footer;
