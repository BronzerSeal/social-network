"use client";

import { useRef, useState } from "react";
import { ArrowUpFromLine, X } from "lucide-react";

const MAX_FILE_SIZE = 4.5 * 1024 * 1024; // 4.5 MB

const NewPhotoComponent = ({
  onFilesChange,
}: {
  onFilesChange?: (files: File[]) => void;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const syncFiles = (newFiles: File[]) => {
    setFiles(newFiles);

    onFilesChange?.(newFiles);
  };

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    const validFiles: File[] = [];
    let errorMessage: string | null = null;

    Array.from(fileList).forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        errorMessage = "The file is larger than 4.5 MB and was not added.";
        return;
      }
      validFiles.push(file);
    });

    if (errorMessage) setError(errorMessage);
    else setError(null);

    const updatedFiles = [...files, ...validFiles];
    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));

    setPreviews((prev) => [...prev, ...newPreviews]);

    syncFiles(updatedFiles);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);

    setPreviews(newPreviews);

    syncFiles(newFiles);
  };

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={onChange}
      />

      <div
        onClick={openFileDialog}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`w-full h-[300px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition 
          ${
            isDragOver
              ? "bg-blue-50 border-blue-400"
              : "bg-gray-50 border-gray-300"
          }`}
      >
        <div className="border-2 border-dashed rounded-2xl h-[90px] w-[90px] flex items-center justify-center">
          <ArrowUpFromLine />
        </div>

        <h1 className="text-xl mt-2 text-center font-semibold">
          Drag and drop a photo here or click to select
        </h1>

        <span className="text-sm text-gray-500 mt-1">
          Limit: 4.5 MB per file
        </span>
      </div>

      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

      {previews.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3">
          {previews.map((src, idx) => (
            <div
              key={idx}
              className="relative w-full aspect-square rounded-lg overflow-hidden border"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(idx);
                }}
                className="absolute top-1 right-1 bg-black/70 rounded-full p-1"
              >
                <X className="text-white h-4 w-4" />
              </button>

              <img src={src} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewPhotoComponent;
