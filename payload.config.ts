import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { buildConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // Editor for Rich Text fields
  editor: lexicalEditor(),
  
  // Admin configuration
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  
  // Define your collections here
  collections: [
    {
      slug: 'homepage',
      admin: {
        useAsTitle: 'title',
        description: 'Manage the homepage content',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Homepage',
        },
        {
          name: 'hero',
          type: 'group',
          label: 'Hero Section',
          fields: [
            {
              name: 'subtitle',
              type: 'text',
              label: 'Subtitle (Authors)',
              defaultValue: 'Unni Gjertsen & Runa Carlsen',
            },
            {
              name: 'mainTitle',
              type: 'textarea',
              label: 'Main Title',
              defaultValue: 'DEN\nVANSKELIGE\nSAMTALEN',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Description',
              defaultValue: 'En kunstnerisk utforskning av dialogens grenser og stillhetens språk.',
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Hero Image',
            },
          ],
        },
        {
          name: 'about',
          type: 'group',
          label: 'Om Prosjektet',
          fields: [
            {
              name: 'heading',
              type: 'text',
              label: 'Overskrift',
              defaultValue: 'En kunstnerisk utforskning av dialogens potensiale.',
            },
            {
              name: 'sectionTitle',
              type: 'text',
              label: 'Seksjonstittel',
              defaultValue: 'OM PROSJEKTET',
            },
            {
              name: 'subtitle',
              type: 'text',
              label: 'Undertittel',
              defaultValue: 'Podcast – work in progress',
            },
            {
              name: 'description',
              type: 'richText',
              label: 'Beskrivelse',
              required: true,
            },
          ],
        },
        {
          name: 'sections',
          type: 'array',
          label: 'Navigation Sections',
          fields: [
            {
              name: 'number',
              type: 'text',
              label: 'Section Number',
            },
            {
              name: 'label',
              type: 'text',
              label: 'Section Label',
            },
          ],
          defaultValue: [
            { number: '01', label: 'Introduksjon' },
            { number: '02', label: 'Historien' },
            { number: '03', label: 'Refleksjon' },
          ],
        },
      ],
    },
    {
      slug: 'media',
      admin: {
        useAsTitle: 'filename',
      },
      upload: {
        staticDir: 'public/images',
        mimeTypes: ['image/*'],
      },
      fields: [
        {
          name: 'alt',
          type: 'text',
          label: 'Alt Text',
        },
      ],
    },
  ],
  
  // Secret for JWT encryption
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-here-change-in-production',
  
  // Database adapter (SQLite for local development)
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || `file:${path.join(dirname, 'payload.db')}`,
    },
  }),
  
  // Sharp for image processing
  sharp,
  
  // TypeScript configuration
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
