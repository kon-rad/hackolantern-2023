import React from "react";

const ImageUpload: React.FC = ({ title, preview, handleImageChange }: any) => {
  return (
    <div>
      <h3 className="text-2xl text-bold mb-6 text-center">{title}</h3>
      <div className="flex justify-center items-center h-72 p-2 m-2">
        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{ maxWidth: "200px", maxHeight: "200px" }}
            className="rounded-2xl m-2"
          />
        )}
      </div>
      <input
        className="rounded border bg-purle-400 mt-4"
        type="file"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImageUpload;
