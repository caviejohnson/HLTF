import index from "./index.html";
import tagger from "./tagger.html";
import { mkdir } from "node:fs/promises";

const server = Bun.serve({
  routes: {
    "/": index,
    "/tagger": tagger,
    "/makejson/:wad": async (req) => {
      const glob = new Bun.Glob(`files/${req.params.wad}/*.png`);
      let text = "{\n";

      Array.from(glob.scanSync()).forEach((v, i, a) => {
        if (i === a.length - 1)
          text += `  "${v.replace(`files\\${req.params.wad}\\`, "")}": []\n}`;
        else
          text += `  "${v.replace(`files\\${req.params.wad}\\`, "")}": [],\n`;
      });

      await Bun.write(`files/${req.params.wad}.json`, text);

      return new Response("Ok");
    },
    "/icon": () => new Response(Bun.file("./media/logo.svg")),
    "/files/:file": async (req) => {
      const path = req.params.file;
      const file = Bun.file(`./files/${path}`);
      if (!(await file.exists()))
        return new Response("Not Found", { status: 404 });
      return new Response(file);
    },
    "/img/:folder/:img": async (req) => {
      const path = req.params.img;
      const folder = req.params.folder;
      const file = Bun.file(`./files/${folder}/${path}`);
      if (!(await file.exists()))
        return new Response("Not Found", { status: 404 });
      return new Response(file);
    },
    "/files": (req) => {
      const glob = new Bun.Glob("files/*.json");
      const files = Array.from(glob.scanSync());
      return Response.json(
        files.map((f) => f.replace("files\\", "").replace(".json", ""))
      );
    },
    "/create/:name": async (req) => {
      const name = req.params.name;
      Bun.write(`./files/${name}.json`, "{}");
      await mkdir(`./files/${name}`);

      return new Response("Ok");
    },
    "/lookup/:wad/:perpage/:page": async (req) => {
      const startIndex = Number(req.params.perpage) * Number(req.params.page);
      const endIndex = startIndex + Number(req.params.page);

      const file = await Bun.file(`./files/${req.params.wad}.json`).json();
      return Response.json(
        Object.entries(file).splice(
          startIndex - Number(req.params.perpage),
          endIndex
        )
      );
    },
    "/saveinfo/:wad/:perpage/:page": async (req) => {
      const startIndex = Number(req.params.perpage) * Number(req.params.page);
      const endIndex = startIndex + Number(req.params.page);

      const data = await req.json();
      const file = await Bun.file(`./files/${req.params.wad}.json`).json();

      data.forEach((item: { image: string; tags: string[] }) => {
        file[item.image] = item.tags;
      });

      await Bun.write(`./files/${req.params.wad}.json`, JSON.stringify(file, null, 2));

      return new Response("Ok");
    },
  },

  development: process.env.NODE_ENV !== "production",
});

console.log(`🚀 Server running at ${server.url}`);
