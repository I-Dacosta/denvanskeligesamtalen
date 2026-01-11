import type { CollectionConfig } from 'payload'

export const Homepage: CollectionConfig = {
  slug: 'homepage',
  admin: {
    useAsTitle: 'title',
    description: 'Manage homepage hero section content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Homepage',
      admin: {
        hidden: true,
      },
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
          defaultValue: 'En kunstnerisk utforskning av dialogens potensiale.',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Hero Image',
        },
        {
          name: 'imageCredit',
          type: 'text',
          label: 'Image Credit',
          defaultValue: 'Foto: Marte Aas',
        },
      ],
    },
    {
      name: 'navigationItems',
      type: 'array',
      label: 'Navigation Items',
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'number',
          type: 'text',
          label: 'Number',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
      ],
      defaultValue: [
        { number: '01', label: 'Om Prosjektet' },
        { number: '02', label: 'Podkast' },
        { number: '03', label: 'Performance' },
        { number: '04', label: 'Teater' },
      ],
    },
    {
      name: 'sponsor',
      type: 'group',
      label: 'Sponsor Section',
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Heading',
          defaultValue: 'Støttet av',
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Sponsor Logo',
        },
        {
          name: 'name',
          type: 'text',
          label: 'Sponsor Name',
          defaultValue: 'Fritt Ord',
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Subtitle',
          defaultValue: 'Stiftelsen',
        },
      ],
    },
  ],
}
