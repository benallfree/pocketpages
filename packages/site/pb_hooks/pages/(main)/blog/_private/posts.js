/**
 * Blog helpers. Every `*.md` file next to `blog/index.ejs` is a post; its
 * frontmatter (title, description, date, author, tags) drives the listing.
 * Drop in a new file and it shows up. No build, no registry.
 */
const BLOG_DIR = `${__hooks}/pages/(main)/blog`

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

/** "2026-11-08" (or a Date from YAML) -> "November 8, 2026" */
const formatDate = (value) => {
  if (!value) return ''
  const iso =
    value instanceof Date ? value.toISOString() : String(value).trim()
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (!m) return iso
  return `${MONTHS[Number(m[2]) - 1]} ${Number(m[3])}, ${m[1]}`
}

/** ISO date string for sorting and <time datetime>. */
const isoDate = (value) =>
  value instanceof Date
    ? value.toISOString().slice(0, 10)
    : String(value || '').slice(0, 10)

/** "a, b" -> ['a', 'b'] */
const splitTags = (value) =>
  String(value || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)

/** About 220 words a minute, rounded up, at least 1. */
const readingTime = (text) => {
  const words = String(text || '')
    .replace(/```[\s\S]*?```/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.ceil(words / 220))
}

/** Minimal frontmatter reader: `key: value` lines between --- fences. */
const parse = (raw) => {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  const attrs = {}
  if (!m) return { attrs, body: raw }
  m[1].split(/\r?\n/).forEach((line) => {
    const i = line.indexOf(':')
    if (i < 1) return
    const key = line.slice(0, i).trim()
    attrs[key] = line
      .slice(i + 1)
      .trim()
      .replace(/^(['"])(.*)\1$/, '$2')
  })
  return { attrs, body: m[2] }
}

/** All posts, newest first. */
const list = () =>
  $os
    .readDir(BLOG_DIR)
    .filter((e) => !e.isDir() && e.name().endsWith('.md'))
    .map((e) => {
      const name = e.name()
      const { attrs, body } = parse(toString($os.readFile(`${BLOG_DIR}/${name}`)))
      return {
        slug: name.replace(/\.md$/, ''),
        title: attrs.title || name,
        description: attrs.description || '',
        author: attrs.author || '',
        date: isoDate(attrs.date),
        dateLabel: formatDate(attrs.date),
        tags: splitTags(attrs.tags),
        minutes: readingTime(body),
      }
    })
    .sort((a, b) =>
      a.date === b.date
        ? a.title.localeCompare(b.title)
        : b.date.localeCompare(a.date)
    )

module.exports = { list, formatDate, isoDate, splitTags }
