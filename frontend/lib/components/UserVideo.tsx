import React from "react";
import Webcam from "react-webcam";

const UserVideo = ({ name }: { name: string }) => {
  const webcamRef = React.useRef<Webcam>(null);

  return (
    <div className="relative bg-gray-700 rounded-lg overflow-hidden">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 bg-black bg-opacity-60 w-full p-2 text-white text-sm">
        {name}
      </div>
    </div>
  );
};

export default UserVideo;
