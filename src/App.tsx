import { Bounce, toast, ToastContainer } from "react-toastify";
import MoudleList from "./components/MoudleList";
import Search from "./components/Search";
import "./index.css";
import { useEffect, useState } from "react";

export function App({ files }: { files: string[] }) {
  const [wad, setWad] = useState<string>(files[0]);
  const [images, setImages] = useState<string[][]>([[], [], []]);
  const [suggestions, setSuggestions] = useState<
    { name: string; amount: number }[]
  >([]);

  useEffect(() => {
    setSuggestions([]);
    setImages([[], [], []]);
  }, [wad]);

  return (
    <div className="bg-purple-100 w-screen h-screen text-lg">
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <Search suggestions={suggestions} setSuggestions={setSuggestions} images={images} setImages={setImages} wad={wad} />
        </div>
        <div className="min-h-screen py-3">
          <MoudleList wads={files} wad={wad} setWad={setWad} />
        </div>
      </div>
    </div>
  );
}

export default App;
