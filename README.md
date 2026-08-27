# website

This is the website for [Aether](https://github.com/wayback09/Aether), a modern, lightweight, and highly extensible Minecraft launcher.

## Contents

This site contains many pages and directories:

- A homepage to display Aether's main features and provide downloads
- An extensive wiki, containing documentation on how to use Aether, as well as information for extension developers and theme creators
- A rich extension marketplace, containing many extensions to enhance Aether the way *you* want

## Development and Contribution

Please look over the [contribution guidelines](CONTRIBUTING.md) for more information on contributing to this website.

This website was made with [Astro](https://astro.build), and referenced the [Starlight Template](https://starlight.astro.build). It is organized like so:

```
├── public/
├── src/
│   ├── assets/
│   ├── content/
│       ├── pages/
│   │   └── docs/
│   └── content.config.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

Pages are stored in the `src/content/docs` directory; similarly, docs are stored in the `src/content/docs/` directory, as `.md` files. Each file is exposed as a route based on its file name. Images can be added to `src/assets/` and embedded in Markdown with a relative link.

The following commands are applicable for this project. They are run from the root of the project, in a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
