import React from "react";
import UserVideo from "./UserVideo";

const ZoomCall = ({ users = [], username = "" }: any) => {
  return (
    <div className="w-full h-screen flex items-center justify-center p-4">
      <div className="grid grid-cols-2 gap-4 w-full h-full max-w-2xl">
        {users.map((user) => (
          <div
            key={user.id}
            className="relative bg-gray-700 rounded-lg overflow-hidden"
          >
            <img
              src={user.img}
              alt={user.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 bg-black bg-opacity-60 w-full p-2 text-sm">
              {user.name}
            </div>
          </div>
        ))}
        <UserVideo name={username} />
      </div>
    </div>
  );
};

export default ZoomCall;
