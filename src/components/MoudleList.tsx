import { $ } from "bun";
import { useRef, useState } from "react";

export default function MoudleList({
  wad,
  setWad,
  wads,
}: {
  wad: string;
  setWad: React.Dispatch<React.SetStateAction<string>>;
  wads: string[];
}) {
  const inputFile = useRef<HTMLInputElement>(null);
  const [wadFile, setWadFile] = useState<string>("");
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [wadRightNow, setWadRightNow] = useState<string>("");

  const createFolder = (e: any) => {
    if (!e.target.files?.[0]) return;
    setWadFile(e.target.files?.[0].name.replace(".wad", ""));
    setWadRightNow(e.target.files?.[0].name.replace(".wad", ""));
    setShowDialog(true);
    fetch(`./create/${e.target.files?.[0].name.replace(".wad", "")}`);
  };

  return (
    <div className="bg-white h-full rounded-l-2xl border-2 border-r-0 border-purple-200">
      <div className="flex p-3">
        <div
          className="bg-purple-700 size-12 rounded-lg text-white flex justify-center hover:bg-purple-800 cursor-pointer"
          onClick={(e) => inputFile.current?.click()}
        >
          <span className="!text-5xl font-bold material-symbols-outlined select-none">
            add
          </span>
        </div>
      </div>
      {wads.map((m) => (
        <div
          className={`${
            wad === m ? "bg-purple-50 font-bold" : ""
          } hover:bg-purple-50 p-3 text-lg cursor-pointer`}
          key={m}
          onClick={() => {
            setWad(m);
          }}
        >
          {m}
        </div>
      ))}

      <input
        onChange={(e: any) => {
          createFolder(e);
        }}
        ref={inputFile}
        type="file"
        accept=".wad"
        className="hidden"
      />

      <div
        className={`${
          showDialog ? "" : "hidden"
        } absolute w-screen h-screen bg-black/50 backdrop-blur left-0 top-0 z-10`}
      ></div>
      <div
        className={`${
          showDialog ? "" : "hidden"
        } absolute top-1/2 left-1/2 w-96 h-min bg-purple-950 text-white -translate-1/2 z-20 p-3 rounded-2xl`}
      >
        <div className="text-4xl mb-1">Next Step</div>
        <div>
          You'll just need to decompile your wad file using WadMaker and put the
          pictures inside the{" "}
          <code className="!font-mono">./files/{wadFile}</code> folder.
        </div>
        <div
          className="mt-5 bg-purple-700 h-12 rounded-lg text-white flex justify-center items-center hover:bg-purple-800 cursor-pointer"
          onClick={() => {console.log("hello"); fetch(`./makejson/${wadRightNow}`)}}
        >
          <span className="select-none">
            Automatically Generate JSON
          </span>
        </div>
      </div>
    </div>
  );
}
