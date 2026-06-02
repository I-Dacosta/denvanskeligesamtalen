import type { CollectionConfig } from 'payload'
import { colorField } from '../fields/color'

export const StoryChapters: CollectionConfig = {
  slug: 'story-chapters',
  admin: {
    useAsTitle: 'subtitle',
    description: 'Manage scroll story chapters',
    defaultColumns: ['subtitle', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'order',
      type: 'number',
      label: 'Order',
      required: true,
      admin: {
        description: 'Order in which chapters appear (1, 2, 3...)',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
    },
    {
      name: 'titleLine1',
      type: 'text',
      label: 'Title Line 1',
      required: true,
    },
    {
      name: 'titleLine2',
      type: 'text',
      label: 'Title Line 2',
    },
    {
      name: 'text',
      type: 'textarea',
      label: 'Description Text',
      required: true,
    },
    colorField('textColor', 'Text color', {
      admin: { description: 'Chapter text color (default: dark).' },
    }),
    {
      name: 'weight',
      type: 'number',
      label: 'Scroll Weight',
      required: true,
      defaultValue: 1,
      admin: {
        description:
          'Controls scroll duration relative to other chapters (higher = longer scroll)',
      },
    },
  ],
}
