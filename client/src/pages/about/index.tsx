import { Calendar, Moon, Smartphone, Users2 } from "lucide-react";
import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className=" bg-slate-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">About This Project</h1>
        <p className="text-lg mb-6">
          Welcome to the Event Management System! This application is designed
          to simplify the process of managing events while providing a seamless
          user experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Users2 className="mr-2" /> User Authentication
            </h2>
            <p className="text-base">
              Secure login and signup functionality with token-based
              authentication to protect user data.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Calendar className="mr-2" /> Event Management
            </h2>
            <p className="text-base">
              Create, read, update, and delete events with an intuitive
              interface and real-time updates.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Moon className="mr-2" /> Dark Mode
            </h2>
            <p className="text-base">
              Enjoy a modern dark mode feature that adapts to your system
              preferences for a comfortable viewing experience.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Smartphone className="mr-2" /> Responsive Design
            </h2>
            <p className="text-base">
              Fully responsive design ensures the application works seamlessly
              on desktops, tablets, and mobile devices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
