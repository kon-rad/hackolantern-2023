"use client";

import { useState } from "react";
import ImageUpload from "@/lib/components/ImageUpload";
import axios from "axios";
import Banner from "@/lib/components/Banner";
import VoiceToText from "@/lib/components/VoiceToText";
import { PiSpinnerGapLight } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/lib/context/GlobalStateProvider";

const defaultTargets = [
  {
    index: 0,
    src: "",
  },
  {
    index: 1,
    src: "",
  },
  {
    index: 2,
    src: "",
  },
];
const HomePage = (): JSX.Element => {
  const [previewTargets, setPreviewTargets] = useState<any[]>([
    ...defaultTargets,
  ]);
  // const [genImage1, setGenImage1] = useState<string | null>(null);
  // const [genImage2, setGenImage2] = useState<string | null>(null);
  // const [genImage3, setGenImage3] = useState<string | null>(null);
  // const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    genImage1,
    setGenImage1,
    genImage2,
    setGenImage2,
    genImage3,
    setGenImage3,
    username,
    setUsername,
    previewSource,
    setPreviewSource,
  } = useGlobalState();

  const router = useRouter();

  const handleSourceImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSource(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleTargetsImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    targetIndex: number
  ) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const currTargets = [...previewTargets];
        currTargets[targetIndex].src = reader.result as string;
        console.log("currTargets: ", currTargets);
        setPreviewTargets(currTargets);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async () => {
    if (previewSource) {
      try {
        const base64Source = previewSource.split(",")[1];
        setIsLoading(true);

        const promises = previewTargets.map(async (pt: any, i: number) => {
          const base64Target = pt.src.split(",")[1];
          return axios.post("/api/image/generate", {
            source: base64Source,
            target: base64Target,
            username,
          });
        });

        const responses = await Promise.all(promises);
        const images = responses.map((response) => response?.data?.response);

        if (images.length > 0) {
          setGenImage1(images[0]);
        }
        if (images.length > 1) {
          setGenImage2(images[1]);
        }
        if (images.length > 2) {
          setGenImage3(images[2]);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error sending image to server:", error);
        setIsLoading(false);
      }
    }
  };
  const handleDownload = () => {
    if (genImage1) {
      const link = document.createElement("a");
      link.href = genImage1;
      link.download = "generated_image.png";
      link.click();
    }
  };
  const handleVideoCall = () => {
    router.push("/video-call");
  };

  return (
    <>
      <Banner
        altText={"background hero"}
        backgroundImage={"/assets/images/twilight-zone-1.gif"}
      />
      <main data-testid="home-page">
        <div className="flex mt-16 justify-center">
          <div className="flex flex-col mr-8 align-center justify-center items-center">
            <ImageUpload
              handleImageChange={handleSourceImageChange}
              preview={previewSource}
              title={"source"}
            />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center my-14">
          {previewTargets.map((t: any, i: number) => {
            return (
              <div className="flex flex-col mr-8" key={`previews-${i}`}>
                <ImageUpload
                  handleImageChange={(src) =>
                    handleTargetsImageChange(src, t.index)
                  }
                  preview={t.src}
                  title={`target ${t.index}`}
                />
              </div>
            );
          })}
        </div>
        <div className="flex flex-col justify-center my-12 items-center">
          <label htmlFor="username" className="text-lg mb-4">
            name
          </label>
          <input
            type="text"
            name="username"
            value={username}
            className="my-4 w-96 border rounded-xl"
            placeholder="your name"
            onChange={(e: any) => setUsername(e.target.value)}
          />
          {isLoading && PiSpinnerGapLight}
          <button
            className="m-12 py-2 px-6 rounded border bg-purple-300 w-40"
            onClick={handleSubmit}
          >
            upload
          </button>
        </div>
        <div className="flex flex-row justify-center items-center my-14">
          {genImage1 && (
            <div className="flex flex-col mr-8">
              <h3 className="text-3xl text-bold text-center mb-12">
                generated image
              </h3>
              <img
                src={genImage1}
                alt="Preview"
                style={{ maxWidth: "300px", maxHeight: "300px" }}
                className="rounded-2xl m-2"
              />
              <div className="flex flex-col justify-center my-12 items-center">
                <button
                  className="m-12 py-2 px-6 rounded border bg-purple-300 w-40"
                  onClick={handleDownload}
                >
                  Download
                </button>
              </div>
            </div>
          )}

          {genImage2 && (
            <div className="flex flex-col mr-8">
              <h3 className="text-3xl text-bold text-center mb-12">
                generated image
              </h3>
              <img
                src={genImage2}
                alt="Preview"
                style={{ maxWidth: "300px", maxHeight: "300px" }}
                className="rounded-2xl m-2"
              />
              <div className="flex flex-col justify-center my-12 items-center">
                <button
                  className="m-12 py-2 px-6 rounded border bg-purple-300 w-40"
                  onClick={handleDownload}
                >
                  Download
                </button>
              </div>
            </div>
          )}

          {genImage3 && (
            <div className="flex flex-col mr-8">
              <h3 className="text-3xl text-bold text-center mb-12">
                generated image
              </h3>
              <img
                src={genImage3}
                alt="Preview"
                style={{ maxWidth: "300px", maxHeight: "300px" }}
                className="rounded-2xl m-2"
              />
              <div className="flex flex-col justify-center my-12 items-center">
                <button
                  className="m-12 py-2 px-6 rounded border bg-purple-300 w-40"
                  onClick={handleDownload}
                >
                  Download
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center my-12 items-center">
          <VoiceToText />
          <button
            className="m-8 px-4 py-2 rounded bg-purple-200 border"
            onClick={handleVideoCall}
          >
            video call
          </button>
        </div>
      </main>
    </>
  );
};

export default HomePage;
