  import React from "react";
  import Hero from "../assets/heroSectionBg.jpg";
  import bottel3 from "../assets/bottel3.png";
  import Ice3 from "../assets/ice3.png";
  import Ice4 from "../assets/ice4.png";
  import Ice1 from "../assets/ice1.png";
  import Ice2 from "../assets/ice2.png";

  const HeroSection = () => {
    return (
      <section
        className="h-screen text-gray-800 bg-center w-full"
        style={{
          backgroundImage: `url(${Hero})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* 1st hero section */}
        <div className="h-full flex flex-col lg:flex-row items-center justify-center px-6 lg:px-16">
          {/* Left Section */}
          <div className="text-center lg:text-left lg:w-1/2">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-black mb-4">
              Refresh Your Day with Pure Water
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-black mb-6">
              Nature’s Best Hydration <br /> Discover the cleanest, healthiest,
              and most refreshing water for your body.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start space-x-4">
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-lg">
                More About Us
              </button>
              <button className="bg-white hover:bg-gray-200 text-blue-600 px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-lg">
                Contact Us
              </button>
            </div>
          </div>

          {/* Right Section (Hidden on Small Screens) */}
          <div className="relative h-auto hidden md:block">
    <img
      src={Ice1}
      alt="Ice"
      className="absolute bottom-8 -left-24 h-8 md:h-20 lg:h-48 w-auto z-0"
    />
    <img
      src={Ice2}
      alt="Ice"
      className="absolute bottom-8 -right-24 h-8 md:h-20 lg:h-48 w-auto z-0"
    />
    <img
      src={bottel3}
      alt="Rotated Water Container"
      className="relative h-auto w-auto z-1"
    />
    <img
      src={Ice4}
      alt="Ice"
      className="absolute -bottom-6 right-16 h-8 md:h-20 lg:h-32 w-auto z-10"
    />
    <img
      src={Ice3}
      alt="Ice"
      className="absolute -bottom-6 left-16 h-8 md:h-20 lg:h-32 w-auto z-10"
    />
  </div>
        </div>


{/*2nd  */}

<div className="h-full flex flex-col lg:flex-row items-center justify-center px-6 lg:px-16">
          {/* Left Section */}
          <div className="text-center lg:text-left lg:w-1/2">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-black mb-4">
              Refresh Your Day with Pure Water
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-black mb-6">
              Nature’s Best Hydration <br /> Discover the cleanest, healthiest,
              and most refreshing water for your body.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start space-x-4">
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-lg">
                More About Us
              </button>
              <button className="bg-white hover:bg-gray-200 text-blue-600 px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-lg">
                Contact Us
              </button>
            </div>
          </div>

          {/* Right Section (Hidden on Small Screens) */}
          <div className="relative h-auto hidden md:block">
    <img
      src={Ice1}
      alt="Ice"
      className="absolute bottom-8 -left-24 h-8 md:h-20 lg:h-48 w-auto z-0"
    />
    <img
      src={Ice2}
      alt="Ice"
      className="absolute bottom-8 -right-24 h-8 md:h-20 lg:h-48 w-auto z-0"
    />
    <img
      src={bottel3}
      alt="Rotated Water Container"
      className="relative h-auto w-auto z-1"
    />
    <img
      src={Ice4}
      alt="Ice"
      className="absolute -bottom-6 right-16 h-8 md:h-20 lg:h-32 w-auto z-10"
    />
    <img
      src={Ice3}
      alt="Ice"
      className="absolute -bottom-6 left-16 h-8 md:h-20 lg:h-32 w-auto z-10"
    />
  </div>
        </div>

      
      </section>
    );
  };

  export default HeroSection;
