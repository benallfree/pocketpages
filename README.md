# PocketPages

> Like PHP, but JS + PocketBase

PocketPages is a lightweight EJS and router engine that runs as a PocketBase JS hook.

Write your web apps like old-school PHP:

```ejs
// pb_hooks/pages/index.ejs
<%= `Hello, world!` %>
```

[Full documentation](https://pocketpages.dev/docs)

## Getting Started

```bash
bunx tiged benallfree/pocketpages/starters/minimal minimal
cd minimal
bun i
bun dev
```

To start editing, find

```
/app/pb_hooks/pages/index.ejs
```

## Watch it cook

Here's a JSON response:

```ejs
// pb_hooks/pages/time.ejs
<%=
{
    time: Date.now()
}
%>
```

Use SvelteKit-inspired route parameters:

```ejs
// pb_hooks/pages/hello/[name]/index.ejs
Hello, <%= name %>
```

Spiff it up with SvelteKit-inspired layouts:

```ejs
// pb_hooks/pages/+layout.ejs
<html>
    <body>
        <%- slot %>
        <div style="font-size: 2pt">
            (c) <%=new Date().getFullYear() %> PocketPages
        </div>
    </body>
</html>
```

EJS-infused Markdown is supported too:

```md
// pb_hooks/pages/test.md

# Big Title

The time is <%=Date.now()%>
```

Organize things as you grow, serving static files and grouping routes:

```
/pb_hooks/pages
    /+layout.ejs
    /(splash)
        /+layout.ejs
        /index.ejs
    /(docs)
        /+layout.ejs
        /advanced-memes.md
        /overview.md
    /hello
        /[name]
            /index.ejs
```

## Why?

- Because when I have a new app idea, I want to make contact with the real world as soon as possible
- Because I want to simply and grow as needed, in any direction I decide
- Because I want a unified SEO-friendly platform without needing to worry about SSR/SSG/SPA
- Because I think pure client-side reactive frameworks like AlpineJS and HTMLx are a perfect compliment to SSR.
- Send a PR to add your reasons here :)

## Contributing

PR's are welcome.

- Docs
- Core features
- Starter kits
- Showcases
