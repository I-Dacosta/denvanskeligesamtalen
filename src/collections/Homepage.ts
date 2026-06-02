import type { CollectionConfig } from 'payload'
import { colorField } from '../fields/color'

export const Homepage: CollectionConfig = {
  slug: 'homepage',
  admin: {
    useAsTitle: 'title',
    description: 'Manage homepage hero section content',
  },
  access: {
    read: () => true,
  },
  hooks: {
    // Keep navigation numbers sequential (01, 02, 03 …) based on position,
    // so editors never have to manage them by hand.
    beforeChange: [
      ({ data }) => {
        if (Array.isArray(data?.navigationItems)) {
          data.navigationItems = data.navigationItems.map(
            (item: Record<string, unknown>, i: number) => ({
              ...item,
              number: String(i + 1).padStart(2, '0'),
            })
          )
        }
        return data
      },
    ],
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
          label: 'Description (plain)',
          defaultValue: 'En kunstnerisk utforskning av dialogens potensiale.',
          admin: {
            description:
              'Used only if the rich description below is left empty.',
          },
        },
        {
          name: 'descriptionRich',
          type: 'richText',
          label: 'Description (rich text — fonts, sizes, colors)',
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
      name: 'theme',
      type: 'group',
      label: 'Colors',
      admin: {
        description: 'Optional color overrides for the hero section.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            colorField('backgroundColor', 'Background color'),
            colorField('textColor', 'Heading text color'),
          ],
        },
      ],
    },
    {
      name: 'navigationItems',
      type: 'array',
      label: 'Navigation Items',
      minRows: 1,
      maxRows: 10,
      admin: {
        description:
          'Each item becomes a button under the hero. Buttons scroll to story chapters 1, 2, 3 … in order.',
        components: {
          RowLabel: '/components/admin/NavRowLabel#NavRowLabel',
        },
      },
      fields: [
        {
          name: 'number',
          type: 'text',
          label: 'Number',
          admin: {
            readOnly: true,
            description: 'Auto-numbered by position (01, 02, 03 …).',
          },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
      ],
      defaultValue: [
        { label: 'Podkast' },
        { label: 'Performance' },
        { label: 'Teater' },
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
          name: 'footnote',
          type: 'text',
          label: 'Footnote (small text at the bottom, aligned with the image)',
          defaultValue: 'Webside under utvikling',
        },
        {
          name: 'items',
          type: 'array',
          label: 'Sponsors',
          labels: { singular: 'Sponsor', plural: 'Sponsors' },
          admin: {
            description:
              'Add one row per sponsor — logos are shown side by side, horizontally. ' +
              'Provide a logo either by uploading an image OR by entering a Logo URL ' +
              '(e.g. /images/fritt-ord.png for a file in the public folder).',
          },
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo (upload)',
            },
            {
              name: 'logoUrl',
              type: 'text',
              label: 'Logo URL (alternative to upload)',
              admin: {
                description:
                  'Used when no logo is uploaded. Accepts a path like /images/fritt-ord.png or a full https:// URL.',
              },
            },
            {
              name: 'name',
              type: 'text',
              label: 'Name (used as image alt text)',
            },
            {
              name: 'url',
              type: 'text',
              label: 'Website (optional)',
            },
          ],
        },
      ],
    },
  ],
}
