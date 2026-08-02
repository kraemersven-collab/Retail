import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Ein Beitrag ist eine Markdown-Datei in src/content/beitraege/.
// Pflichtangaben im Frontmatter: titel, beschreibung, datum.
const beitraege = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/beitraege' }),
  schema: z.object({
    titel: z.string(),
    beschreibung: z.string(),
    datum: z.coerce.date(),
  }),
});

export const collections = { beitraege };
