# Minimal PocketPages Starter Kit

## Installation

```bash
mkdir minimal
cd minimal
npx tiged benallfree/pocketpages/packages/starters/minimal . && sed -i 's/"workspace://g' package.json
pocketbase --dir=pb_data --dev serve
```
