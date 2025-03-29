import { Image } from "@/TaggerApp";
import { useState } from "react";

export default function Images({
  wad,
  images,
}: {
  wad: string;
  images: Image[];
}) {
  return (
    <div className="bg-purple-100 overflow-y-scroll">
      {images.map((v) => (
        <div className="flex gap-3" key={v.image}>
          <div className="w-1/4">
            <img
              className="w-full rounded-lg"
              src={`./img/${wad}/${v.image}`}
            />
          </div>
          <div className="flex gap-3 items-center">
            {v.tags.map((t) => (
              <div
                className="bg-purple-800 p-3 text-white rounded-lg hover:bg-purple-950 cursor-pointer h-12"
                key={t}
              >
                {t}
              </div>
            ))}
            <div
              className="bg-purple-800 flex items-center text-white rounded-lg hover:bg-purple-950 cursor-pointer h-12"
              // onClick={() => {if (!v.inputVisibile) }}}
            >
              {v.inputVisibile ? (
                <input
                  type="text"
                  className="text-black h-12 outline-0 bg-purple-300 rounded-lg p-3"
                />
              ) : (
                <span className="material-symbols-outlined font-bold text-2xl !leading-none">
                  add
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
