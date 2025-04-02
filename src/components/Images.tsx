import { Image } from "@/TaggerApp";
import { useRef } from "react";

export default function Images({
  wad,
  images,
  setImages,
  setIsChanging,
}: {
  wad: string;
  images: Image[];
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
  setIsChanging: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="bg-purple-100 p-3">
      {images.map((v) => (
        <div className="flex gap-3 mb-3" key={v.image}>
          <div className="relative w-1/4 bg-purple-200 flex items-center rounded-lg">
            <div className="absolute top-0 left-0 bg-black/50 text-white rounded-t-lg p-1 w-full">
              {v.image}
            </div>
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
                onClick={() => {
                  setImages(
                    images.map(
                      (img): Image =>
                        img === v
                          ? {
                              image: v.image,
                              tags: img.tags.filter((tag) => tag !== t),
                              inputVisibile: false,
                            }
                          : img
                    )
                  );
                  setIsChanging(true);
                }}
              >
                {t}
              </div>
            ))}
            <div
              className="bg-purple-800 flex items-center text-white rounded-lg hover:bg-purple-950 cursor-pointer min-w-12 h-12"
              onClick={() => {
                if (!v.inputVisibile) {
                  setIsChanging(true);
                  setImages(
                    images.map((img): Image => {
                      if (v.image === img.image)
                        return {
                          image: v.image,
                          tags: v.tags,
                          inputVisibile: true,
                        };
                      return img;
                    })
                  );
                }
              }}
            >
              {v.inputVisibile ? (
                <input
                  autoFocus
                  type="text"
                  className="text-black h-12 outline-0 bg-purple-300 rounded-lg p-3"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setImages(
                        images.map(
                          (img): Image =>
                            img.image === v.image
                              ? {
                                  image: v.image,
                                  tags: [...v.tags, e.currentTarget.value],
                                  inputVisibile: true,
                                }
                              : img
                        )
                      );
                      e.currentTarget.value = "";
                    }
                  }}
                  onBlur={() => {
                    setImages(
                      images.map(
                        (img): Image =>
                          img.image === v.image
                            ? {
                                image: v.image,
                                tags: v.tags,
                                inputVisibile: false,
                              }
                            : img
                      )
                    );
                  }}
                />
              ) : (
                <span className="text-center w-full material-symbols-outlined font-bold text-2xl !leading-none">
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
