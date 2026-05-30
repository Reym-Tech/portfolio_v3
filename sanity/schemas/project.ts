export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'summary',
      title: 'Summary',
      description: 'One restrained line shown on the project card.',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
        },
      ],
    },
    {
      name: 'tags',
      title: 'Technology Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'body',
      title: 'Case Study',
      description: 'Rich content shown on the project detail page.',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'liveUrl',
      title: 'Live URL',
      type: 'url',
    },
    {
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
    },
    {
      name: 'featured',
      title: 'Featured',
      description: 'Show on the home page.',
      type: 'boolean',
    },
    {
      name: 'order',
      title: 'Order',
      description: 'Lower numbers appear first.',
      type: 'number',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
    },
  },
};
