import WadSelector from "./components/WadSelector";
import Images from "./components/Images";
import "./index.css";
import { useEffect, useState } from "react";
import MoudleList from "./components/MoudleList";

export interface Image {
  image: string;
  tags: string[];
  inputVisibile: boolean;
}

export default function TaggerApp({ files }: { files: string[] }) {
  const [isChanging, setIsChanging] = useState<boolean>(false);
  const [wad, setWad] = useState<string>(files[0]);
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    setIsChanging(true);
  }, [images])

  return (
    <div className="w-screen h-screen bg-purple-100 grid grid-cols-3">
      <div className="col-span-2 h-screen overflow-y-scroll">
        <WadSelector isChanging={isChanging} setIsChanging={setIsChanging} images={images} wad={wad} setImages={setImages} />
        <Images wad={wad} images={images} setImages={setImages} />
      </div>
      <div className="min-h-screen py-3">
        <MoudleList wads={files} wad={wad} setWad={setWad} />
      </div>
    </div>
  );
}
