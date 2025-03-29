export default function WadSelector() {
  return (
    <div className="bg-purple-200 m-3 rounded-2xl p-3 flex h-min">
      <div className="w-full">
        <select
          className="w-1/2 bg-white p-2 rounded-lg rounded-r-none focus:rounded-b-none outline-0 h-12"
        >
          <option className="bg-purple-800 text-white rounded-lg" value="">
            Select WAD file
          </option>
          <option className="bg-purple-800 text-white rounded-lg" value="a">
            asdasd
          </option>
          <option className="bg-purple-800 text-white rounded-lg" value="b">
            asdasd
          </option>
          <option className="bg-purple-800 text-white rounded-lg" value="v">
            asdasd
          </option>
        </select>

        <input
          type="number"
          className="bg-white p-2 outline-0 w-1/4 h-12 border-x border-black/10"
          placeholder="Page number"
        />
        <input
          type="number"
          className="bg-white p-2 outline-0 w-1/4 h-12"
          placeholder="Texture per page"
        />
      </div>

      <div
        className="flex justify-center items-center rounded-r-lg bg-purple-700 text-white p-2 select-none hover:bg-purple-800 cursor-pointer"
        // onClick={searchFor}
      >
        <span className="material-symbols-outlined font-bold text-2xl !leading-none">
          search
        </span>
      </div>
    </div>
  );
}
