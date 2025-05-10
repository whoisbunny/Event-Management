import React from 'react';

const Footer = () => {
    return (
        <footer className="p-4 text-center bg-white dark:bg-gray-800 dark:text-gray-300">
            <p className="text-sm sm:text-base">
                © {new Date().getFullYear()} Admin Panel. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;