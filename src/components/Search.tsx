import { useState } from "react";
import SearchBox from "./SearchBox";
import { Bounce, toast } from "react-toastify";

export default function Search({
  wad,
  images,
  setImages,
  suggestions,
  setSuggestions,
}: {
  suggestions: { name: string; amount: number }[];
  setSuggestions: React.Dispatch<React.SetStateAction<{ name: string; amount: number }[]>>;
  wad: string;
  images: string[][];
  setImages: React.Dispatch<React.SetStateAction<string[][]>>;
}) {
  const [query, setQuery] = useState<string>("");

  const searchFor = async () => {
    try {
      const response = await fetch(`./files/${wad}.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      const queryTags = query.split(" ").filter((t) => t.trim() !== "");
      const results = Object.entries(data)
        .filter(([_, tags]) => queryTags.every((tag) => tags.includes(tag)))
        .map(([filename]) => filename);

      const imagesCopy: string[][] = [[], [], []];
      results.forEach((res, i) => {
        imagesCopy[i % 3].push(res);
      });

      setImages(imagesCopy);
    } catch (error) {
      toast.error(
        `Couldn't find the WAD file. Make sure ./files/${wad}.json actually exists`,
        {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        }
      );

      console.error(error);
    }
  };

  return (
    <div className="col-span-2">
      <SearchBox
      suggestions={suggestions}
      setSuggestions={setSuggestions}
        wad={wad}
        searchFor={searchFor}
        query={query}
        setQuery={setQuery}
      />
      <div className="grid grid-cols-4">
        {images.map((imgs, i) => (
          <div key={i}>
            {imgs.map((img) => (
              <div key={img} className="p-3 mx-3 rounded-lg bg-purple-200">
                <img src={`img/${wad}/${img}`} className="w-full" />
                <div
                  className="flex pt-3 cursor-pointer"
                  title="Click to copy"
                  onClick={() => navigator.clipboard.writeText(img.replace(".png", ""))}
                >
                  <div>{img.replace(".png", "")}</div>
                  <div className="ml-auto material-symbols-outlined !font-bold hover:animate-[spin_1s_ease-in-out]">
                    content_copy
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
