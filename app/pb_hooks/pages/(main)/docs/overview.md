# Make SSR Great Again

Let's party like it's 1995 when PHP was just released and we learned how to make a web app in one file.

With PocketPages, making apps is that easy again. PocketPages is based fundamentally in [EJS](https://ejs.co/). You can get started in just one file:

```ejs
// index.ejs
<%= `Hello, world!` %>
```

Inside `<%` and `%>`, you have the full power of JavaScript plus PocketBase's [JSVM](https://pocketbase.io/jsvm/index.html) which defines all of PocketBase's built-in functions.

> Note:

#

```bash
bunx pocketpages dev
```

The first time you run `pocketpages`, it will ask a few questions and get you logged in.

If `index.ejs` does not exist, PocketPages assumes this is a new project and will create one for you:

Your files are automatically sync'd to your PocketPages project. Visit `https://<yourproject>.pocketpages.dev` to see it in action.
