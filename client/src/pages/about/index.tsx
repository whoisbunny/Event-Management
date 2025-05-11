import React from "react";

const AboutPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-4">About Us</h1>
                <p className="text-lg">
                    Welcome to our company! We are dedicated to delivering the best
                    solutions for our clients. Our team is passionate about innovation
                    and excellence.
                </p>
                <p className="text-lg mt-4">
                    Feel free to explore our website to learn more about what we do and
                    how we can help you achieve your goals.
                </p>
            </div>
        </div>
    );
};

export default AboutPage;