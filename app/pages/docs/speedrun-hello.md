# Speedrun: Hello, PocketPages!

PocketPages makes it as easy to get up and running as the old days with PHP.

```bash
bunx pocketpages dev
```

The first time you run `pocketpages`, it will ask a few questions and get you logged in.

If `index.ejs` does not exist, PocketPages assumes this is a new project and will create one for you:

```ejs
// index.ejs
<%= `Hello, world!` %>
```

Your files are automatically sync'd to your PocketPages project. Visit `https://<yourproject>.pocketpages.dev` to see it in action.
