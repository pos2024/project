import React from "react";

const Home = () => {
  return (
    <section className="bg-gray-100 text-gray-800">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center px-6 py-16 space-y-8 lg:space-y-0 lg:space-x-8">
        <div className="lg:w-1/2">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Welcome to <span className="text-blue-600">Our Service</span>
          </h1>
          <p className="text-lg mb-6">
            Experience top-notch water delivery services right at your doorstep. 
            Clean, reliable, and affordable solutions for all your hydration needs.
          </p>
          <div className="space-x-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-500">
              Get Started
            </button>
            <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-300">
              Learn More
            </button>
          </div>
        </div>
        <div className="lg:w-1/2">
          <img
            src="https://via.placeholder.com/600x400"
            alt="Hero Illustration"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
