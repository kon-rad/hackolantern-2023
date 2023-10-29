"use client";

import ZoomCall from "@/lib/components/ZoomCall";
import { MdArrowBack } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/lib/context/GlobalStateProvider";

const VideoCall = () => {
  const { genImage1, genImage2, genImage3, username } = useGlobalState();
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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: 'url("/assets/images/nightmare.gif")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="flex flex-col justify-center items-center py-18"
    >
      <h1 className="text-5xl text-white text-center mt-16 py-16">
        video call in the twilight zone{" "}
      </h1>
      <div className="flex container cursor-pointer">
        <MdArrowBack
          className="text-white"
          style={{ color: "white", height: "40px", width: "40px" }}
          width="80px"
          onClick={handleBack}
        />
      </div>
      <ZoomCall users={users} username={username} />
    </div>
  );
};

export default VideoCall;
