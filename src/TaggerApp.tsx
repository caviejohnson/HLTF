import WadSelector from "./components/WadSelector";
import Images from "./components/Images";
import "./index.css";
import { useState } from "react";
import MoudleList from "./components/MoudleList";

export interface Image {
  image: string;
  tags: string[];
  inputVisibile: boolean;
}

export default function TaggerApp({ files }: { files: string[] }) {
  const [wad, setWad] = useState<string>(files[0]);
  const [images, setImages] = useState<Image[]>([]);

  return (
    <div className="w-screen h-screen bg-purple-100 grid grid-cols-3">
      <div className="col-span-2">
        <WadSelector wad={wad} setImages={setImages} />
        <Images wad={wad} images={images} />
      </div>
      <div className="min-h-screen py-3">
        <MoudleList wads={files} wad={wad} setWad={setWad} />
      </div>
    </div>
  );
}
