import { ArrowUpFromLine } from "lucide-react";

const NewPhotoComponent = () => {
  return (
    <div className="w-full border-2 border-gray-300 border-dashed h-[400px] rounded-[10px] flex items-center flex-col justify-center hover:bg-gray-100 transition cursor-pointer">
      <div className="border-3 border-black border-dashed rounded-[20px] h-[90px] w-[90px] flex items-center flex-col justify-center">
        <ArrowUpFromLine />
      </div>
      <h1 className="text-2xl mt-2">add photo</h1>
    </div>
  );
};

export default NewPhotoComponent;
