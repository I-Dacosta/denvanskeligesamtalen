import type { CollectionConfig } from 'payload'

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
      required: true,
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
      required: true,
    },
    {
      name: 'text',
      type: 'textarea',
      label: 'Description Text',
      required: true,
    },
    {
      name: 'highlight',
      type: 'text',
      label: 'Highlighted Text',
      required: true,
      admin: {
        description: 'Key phrase to highlight in this chapter',
      },
    },
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
