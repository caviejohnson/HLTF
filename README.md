# <img src="media/logo.svg" alt="logo" width="20"/> Half Life Texture Finder

> **Note:** You'll need to download [WadMaker](https://github.com/pwitvoet/wadmaker). This is used to decompile WAD files as the decompiled images are not going to be included in any downloadable tag json file.

![Texture Finder Banner](media/banner.svg)

**Half Life Texture FInder** is a tagging tool that you can use to easily search your WADs for diffrent files. You can find these textures with a nice UI as well.

## Installation and usage

Right now the executable isn't available. Please run the program manually using the instructions provided in the "Development setup" section.

~~To intsall HLTF, you can simply download the zip file from the "Releases" tab. **This method can be unsafe.** To compile the program yourself, please look into the "Development setup" part of this file.~~

You can simply run the executable, and then open the UI at [localhost:3000](http://localhost:3000/).

You'll have to include your own tags. You can get these tags from diffrent places, but you'll have to decompile the WADs yourself.

## Development setup

> **Note:** You'll need to download Bun as well.

To install dependencies, run:

```bash
bun install
```

To start a development server, run:

```bash
bun dev
```

To start a run, run:

```bash
bun start
```

<!-- To compile to an executable, run:

```bash
bun compile
``` -->