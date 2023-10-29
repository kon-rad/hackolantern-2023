import React from "react";
import UserVideo from "./UserVideo";

const demo = false;
const ZoomCall = ({ users = [], username = "" }: any) => {
  const displayUsers = [...users];
  console.log("users: ", users);

  if (demo) {
    displayUsers[0].img = "/generated/frank-kon.png";
    displayUsers[0].name = "frankenstein konrad";
    displayUsers[1].img = "/generated/konrad.png";
    displayUsers[1].name = "ken konrad";
    displayUsers[2] = {
      img: "/generated/vampire-talking.mp4",
      name: "vampire konrad",
    };
  }
  const VideoComponent = ({ src, name }) => (
    <div className="relative bg-gray-700 rounded-lg overflow-hidden">
      <video
        src={src}
        alt={name}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        controls
      />
      <div className="absolute bottom-0 bg-black bg-opacity-60 w-full p-2 text-white text-sm">
        {name}
      </div>
    </div>
  );
  return (
    <div className="w-full h-screen flex items-center justify-center p-4 mb-16">
      <div className="grid grid-cols-2 gap-4 w-full h-full max-w-2xl">
        {displayUsers.map((user, index) => {
          if (demo && index === 2) {
            return (
              <VideoComponent key={user.id} src={user.img} name={user.name} />
            );
          }
          return (
            <div
              key={user.id}
              className="relative bg-gray-700 rounded-lg overflow-hidden"
            >
              <img
                src={user.img}
                alt={user.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 bg-black bg-opacity-60 w-full p-2 text-white text-sm">
                {user.name}
              </div>
            </div>
          );
        })}
        <UserVideo name={username} />
      </div>
    </div>
  );
};

export default ZoomCall;
