# DaisyUI PocketPages Starter Kit

This setup provides a minimal **PocketPages** app integrated with **Tailwind CSS** and **DaisyUI**.

## Installation

```bash
mkdir daisyui
cd daisyui
npx tiged benallfree/pocketpages/packages/starters/daisyui . && sed -i 's/"workspace://g' package.json
pocketbase serve --dir=pb_data --dev
```
