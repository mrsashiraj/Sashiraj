import React from "react";

const Hero = () => {
  return (
    <section className="pt-32 pb-24 px-6 bg-white dark:bg-black transition-colors">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sm uppercase font-bold text-gray-500 mb-4 tracking-widest">
          Operations, Quality & Data Strategy
        </p>
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          QUALITY <br />
          <span className="italic font-light opacity-50">
            THROUGH
          </span> DATA <br />
          INSIGHTS
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Detail-oriented professional specializing in project execution and
          operational compliance (ISO 9001/22000).
        </p>
      </div>
    </section>
  );
};

export default Hero;
