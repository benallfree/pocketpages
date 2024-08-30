# AlpineJS + HTMLx + Daisy UI

```css
// app.css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```bash
bun add -D @tailwindcss/typography daisyui tailwindcss
```

```json
  "scripts": {
    "dev:css": "tailwindcss -i ./app/app.css -o ./app/app/app.css --watch",
  },
```
