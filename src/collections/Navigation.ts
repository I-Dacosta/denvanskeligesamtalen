import type { CollectionConfig } from 'payload'

export const Navigation: CollectionConfig = {
  slug: 'navigation',
  admin: {
    useAsTitle: 'title',
    description: 'Manage navigation and about content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Navigation Content',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'about',
      type: 'group',
      label: 'Om Prosjektet Section',
      fields: [
        {
          name: 'sectionLabel',
          type: 'text',
          label: 'Section Label',
          defaultValue: 'Om Prosjektet',
        },
        {
          name: 'heading',
          type: 'text',
          label: 'Heading',
          defaultValue: 'Den vanskelige samtalen',
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Subtitle',
          defaultValue: 'Podkast – work in progress',
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Description',
          required: true,
        },
        {
          name: 'partnersHeading',
          type: 'text',
          label: 'Partners Heading',
          defaultValue: 'Samarbeidspartnere',
        },
        {
          name: 'partnersText',
          type: 'textarea',
          label: 'Partners Text',
          defaultValue:
            'Astrid Folkedal Kraidy (Nansen Fredssenter), Stephan Lyngved (Flink Pike Podcast Production), performance kunstnere Hanna Filomen Mjåvatn og Mariko Miyata.',
        },
      ],
    },
    {
      name: 'artists',
      type: 'array',
      label: 'Artists',
      minRows: 2,
      maxRows: 10,
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Name',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          label: 'Role',
          required: true,
        },
        {
          name: 'bio',
          type: 'richText',
          label: 'Biography',
          required: true,
        },
        {
          name: 'website',
          type: 'text',
          label: 'Website URL',
        },
      ],
      defaultValue: [
        {
          name: 'Unni Gjertsen',
          role: 'Billedkunstner, filmskaper og forfatter',
          website: 'https://unnigjertsen.com',
        },
        {
          name: 'Runa Carlsen',
          role: 'Billedkunstner',
          website: 'https://www.runacarlsen.no/',
        },
      ],
    },
  ],
}
