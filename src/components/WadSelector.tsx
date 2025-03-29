import { Image } from "@/TaggerApp";
import { useState } from "react";

export default function WadSelector({
  wad,
  setImages,
}: {
  wad: string;
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
}) {
  const [searchValues, setSearchValues] = useState<{
    page: string;
    per: string;
  }>({page: "", per: ""});

  const lookup = async () => {
    console.log((await (await fetch(`./lookup/${wad}/${searchValues.per}/${searchValues.page}`)).json()).map(([img, tags]: [string, string]) => ({image: img, tags: tags, inputVisibile: false})));
    setImages((await (await fetch(`./lookup/${wad}/${searchValues.per}/${searchValues.page}`)).json()).map(([img, tags]: [string, string]) => ({image: img, tags: tags, inputVisibile: false})));
  };

  return (
    <div className="bg-purple-200 m-3 rounded-2xl p-3 flex h-min">
      <div className="w-full">
        <input
          type="number"
          className="bg-white p-2 outline-0 w-1/2 rounded-l-lg h-12 border-x border-black/10"
          placeholder="Page number"
          value={searchValues.page}
          onChange={(e) => setSearchValues({page: e.target.value, per: searchValues.per})}
        />
        <input
          type="number"
          className="bg-white p-2 outline-0 w-1/2 h-12"
          placeholder="Texture per page"
          value={searchValues.per}
          onChange={(e) => setSearchValues({page: searchValues.page, per: e.target.value})}
        />
      </div>

      <div
        className="flex justify-center items-center rounded-r-lg bg-purple-700 text-white p-2 select-none hover:bg-purple-800 cursor-pointer"
        onClick={lookup}
      >
        <span className="material-symbols-outlined font-bold text-2xl !leading-none">
          search
        </span>
      </div>
    </div>
  );
}
