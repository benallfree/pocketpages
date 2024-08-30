# Speedrun: Hello, PocketPages!

Let's party like it's 1995. PHP was just released and we learned how to make a web app in one file.

With PocketPages, it's that easy again.

#

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
