// useImagePreview.js
import { useState, useEffect } from "react";

const useImagePreview = (initialFile) => {
  const [selectedFile, setSelectedFile] = useState(initialFile);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      setSelectedFile(null);
      return;
    }

    const selectedImage = files[0];
    setSelectedFile(selectedImage);
  };

  return { preview, onSelectFile };
};

export default useImagePreview;
