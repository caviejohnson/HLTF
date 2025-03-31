import { Image } from "@/TaggerApp";
import { useState } from "react";

export default function WadSelector({
  wad,
  images,
  setImages,
  isChanging,
  setIsChanging,
}: {
  wad: string;
  images: Image[];
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
  isChanging: boolean;
  setIsChanging: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [searchValues, setSearchValues] = useState<{
    page: string;
    per: string;
  }>({ page: "", per: "" });

  const lookup = async () => {
    setImages(
      (
        await (
          await fetch(
            `./lookup/${wad}/${searchValues.per}/${searchValues.page}`
          )
        ).json()
      ).map(([img, tags]: [string, string]) => ({
        image: img,
        tags: tags,
        inputVisibile: false,
      }))
    );
  };

  return (
    <div className="bg-purple-200 m-3 rounded-2xl p-3 flex h-min">
      <div className="w-full">
        {isChanging ? (
          <div className="bg-white text-red-950">You have unsaved changes!</div>
        ) : (
          <>
            <input
              type="number"
              className="bg-white p-2 outline-0 w-1/2 rounded-l-lg h-12 border-x border-black/10"
              placeholder="Page number"
              value={searchValues.page}
              onChange={(e) =>
                setSearchValues({ page: e.target.value, per: searchValues.per })
              }
            />
            <input
              type="number"
              className="bg-white p-2 outline-0 w-1/2 h-12 rounded-r-lg"
              placeholder="Texture per page"
              value={searchValues.per}
              onChange={(e) =>
                setSearchValues({
                  page: searchValues.page,
                  per: e.target.value,
                })
              }
            />
          </>
        )}
      </div>

      <div
        className="ml-3 bg-purple-700 flex items-center justify-center text-white rounded-l-lg hover:bg-purple-800 border-r border-purple-800 cursor-pointer size-12"
        onClick={() => {
          setIsChanging(false);
          fetch(`./saveinfo/${wad}/${searchValues.per}/${searchValues.page}`, {
            method: "POST",
            body: JSON.stringify(images),
          });
        }}
      >
        <span className="material-symbols-outlined">send</span>
      </div>

      <div
        className="flex justify-center items-center rounded-r-lg bg-purple-700 text-white p-2 select-none hover:bg-purple-800 cursor-pointer size-12"
        onClick={lookup}
      >
        <span className="material-symbols-outlined font-bold text-2xl !leading-none">
          search
        </span>
      </div>
    </div>
  );
}
