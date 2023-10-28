"use client";

import { useState } from "react";
import ImageUpload from "@/lib/components/ImageUpload";
import axios from "axios";
import Banner from "@/lib/components/Banner";

const HomePage = (): JSX.Element => {
  const [previewSource, setPreviewSource] = useState<string | null>(null);
  const [previewTarget, setPreviewTarget] = useState<string | null>(null);
  const [genImage1, setGenImage1] = useState<string | null>(null);

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
  const handleTargetImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewTarget(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async () => {
    if (previewSource && previewTarget) {
      try {
        // Extract the base64 string from data URL
        const base64Source = previewSource.split(",")[1];
        const base64Target = previewTarget.split(",")[1];

        const response = await axios.post("/api/image/generate", {
          source: base64Source,
          target: base64Target,
        });
        console.log("Response from server:", response.data);
        if (response?.data?.response) {
          setGenImage1(response.data.response);
        } else {
          console.error("no recieved image");
        }
      } catch (error) {
        console.error("Error sending image to server:", error);
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

  return (
    <>
      <Banner
        altText={"background hero"}
        backgroundImage={"/assets/images/twilight-zone-1.gif"}
      />
      <main data-testid="home-page">
        {/* <div className="flex flex-col justify-center items-center my-24">
        <h1 className="text-5xl text-center my-18">Twilight Zone Video Chat</h1>
        <button className="m-12 py-2 px-6 rounded border">enter</button>
      </div> */}
        <div className="flex mt-16 justify-center">
          <div className="flex flex-col mr-8 align-center justify-center items-center">
            <ImageUpload
              handleImageChange={handleSourceImageChange}
              preview={previewSource}
              title={"source"}
            />
          </div>
          <div className="flex flex-col mr-8">
            <ImageUpload
              handleImageChange={handleTargetImageChange}
              preview={previewTarget}
              title={"target"}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center my-12 items-center">
          <button
            className="m-12 py-2 px-6 rounded border bg-purple-300 w-40"
            onClick={handleSubmit}
          >
            upload
          </button>
        </div>
        {genImage1 && (
          <div className="flex flex-col justify-center my-12 items-center">
            <h3 className="text-3xl text-bold text-center mb-12">
              generated image
            </h3>
            <img
              src={genImage1}
              alt="Preview"
              style={{ maxWidth: "700px", maxHeight: "700px" }}
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
      </main>
    </>
  );
};

export default HomePage;
