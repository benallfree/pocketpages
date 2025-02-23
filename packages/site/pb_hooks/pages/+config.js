module.exports = {
  plugins: [
    {
      name: `pocketpages-plugin-ejs`,
      extensions: ['.ejs', '.md'],
      debug: true,
    },
    'pocketpages-plugin-marked',
  ],
}
