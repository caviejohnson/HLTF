import WadSelector from "./components/WadSelector";
import Images from "./components/Images";
import "./index.css";
import { useState } from "react";
import MoudleList from "./components/MoudleList";

export default function TaggerApp({ files }: { files: string[] }) {
  const [wad, setWad] = useState<string>(files[0]);

  return (
    <div className="w-screen bg-purple-100 grid grid-cols-3 h-screen">
      <div className="col-span-2">
        <WadSelector />
        <Images />
      </div>
      <div className="min-h-screen py-3">
        <MoudleList wads={files} wad={wad} setWad={setWad} />
      </div>
    </div>
  );
}
