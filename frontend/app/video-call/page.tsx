"use client";

import ZoomCall from "@/lib/components/ZoomCall";
import { MdArrowBack } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/lib/context/GlobalStateProvider";

const VideoCall = () => {
  const {
    genImage1,
    setGenImage1,
    genImage2,
    setGenImage2,
    genImage3,
    setGenImage3,
    username,
    setUsername,
  } = useGlobalState();
  const users = [
    { id: 1, name: "User 1", img: genImage1 },
    { id: 2, name: "User 2", img: genImage2 },
    { id: 3, name: "User 3", img: genImage3 },
  ];
  const router = useRouter();

  const handleBack = () => {
    router.push("/");
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-5xl text-center my-18">video call</h1>
      <div className="flex container cursor-pointer">
        <MdArrowBack width="80px" onClick={handleBack} />
      </div>
      <ZoomCall users={users} username={username} />
    </div>
  );
};

export default VideoCall;
