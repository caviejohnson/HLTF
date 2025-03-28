import { useState } from "react";

export default function SearchBox({
  query,
  setQuery,
  searchFor,
  wad,
  suggestions,
  setSuggestions,
}: {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  suggestions: { name: string; amount: number }[];
  setSuggestions: React.Dispatch<React.SetStateAction<{ name: string; amount: number }[]>>;
  searchFor: () => {};
  wad: string;
}) {
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const getSuggestions = async () => {
    try {
      const response = await fetch(`./files/${wad}.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      const tagFrequencies: { [tag: string]: number } = {};
      Object.values(data).forEach((tagsArray) => {
        tagsArray.forEach((tag) => {
          if (!tagFrequencies[tag]) tagFrequencies[tag] = 0;
          tagFrequencies[tag]++;
        });
      });

      const suggestionsCopy: { name: string; amount: number }[] = [];

      Object.keys(tagFrequencies).forEach((tag) => {
        if (tag.toLowerCase().includes(query.toLowerCase())) {
          suggestionsCopy.push({
            name: tag,
            amount: tagFrequencies[tag],
          });
        }
      });

      suggestionsCopy.sort((a, b) => b.amount - a.amount);

      setSuggestions(suggestionsCopy.slice(0, 10));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex bg-purple-200 p-3 m-3 rounded-2xl h-min">
      <div className="w-full relative">
        <input
          placeholder="button red active"
          className="bg-white focus:rounded-b-none outline-none placeholder:text-purple-900/50 rounded-l-lg w-full p-2"
          type="text"
          id="searchInput"
          onFocus={() => {
            setIsSearching(true);
          }}
          onBlur={() => {
            setTimeout(() => setIsSearching(false), 1000);
          }}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            getSuggestions();
          }}
          onKeyDown={(e) => {
            if (e.key === "enter") searchFor();
          }}
        />
        <div
          className={`${
            isSearching ? "" : "hidden"
          } absolute w-full l-0 bg-purple-700 rounded-b-lg text-white`}
        >
          {suggestions.map((sug, i) => (
            <div
              className={`p-2 hover:bg-purple-800 select-none cursor-pointer ${
                i === suggestions.length - 1 ? "rounded-b-lg" : ""
              }`}
              onClick={() => setQuery(sug.name)}
            >
              {sug.name} ({sug.amount})
            </div>
          ))}
        </div>
      </div>
      <div
        className="flex justify-center items-center rounded-r-lg bg-purple-700 text-white p-2 select-none hover:bg-purple-800 cursor-pointer"
        onClick={searchFor}
      >
        <span className="material-symbols-outlined font-bold text-2xl !leading-none">
          search
        </span>
      </div>
    </div>
  );
}
