import React from 'react';

const Hero = () => {
  return (
    <div className="hero relative">
      <div className="absolute flex flex-col bottom-5 left-5 text-white px-4 py-12">
        <h2 className="text-4xl font-bold mb-4">Order Your Favourite Food Here</h2>
        <p className="text-lg mb-6">
          Welcome to Khaja-Sathi! Enjoy our delicious meals made with fresh ingredients — 
          delivered hot and fast, straight to your door.
        </p>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-medium py-0.5 px-1  h-12 w-28 rounded-full">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Hero;