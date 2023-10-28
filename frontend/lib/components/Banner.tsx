import React from 'react';

interface BannerProps {
  backgroundImage: string; // URL of the background image
  altText: string; // Alternative text for the image
}

const Banner: React.FC<BannerProps> = ({ backgroundImage, altText }) => {
  return (
    <div
      className="w-full h-[500px] bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
        <p className="text-white text-3xl font-bold">Enter The Twilight Zone Video Chat</p>
      </div>
    </div>
  );
};

export default Banner;