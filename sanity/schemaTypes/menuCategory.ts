import { defineField, defineType } from "sanity";

export const menuCategorySchema = defineType({
  name: "menuCategory",
  title: "Menu Category",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Category Name",
      type: "string",
      description: 'e.g. "Nigerian Classics"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "emoji",
      title: "Emoji Icon",
      type: "string",
      description: "Single emoji to represent this category e.g. 🍛",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Category Description",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.max(180),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 99,
    }),
    defineField({
      name: "items",
      title: "Menu Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Dish Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Short Description",
              type: "text",
              rows: 2,
              validation: (Rule) => Rule.max(200),
            }),
            defineField({
              name: "dietary",
              title: "Dietary Tags",
              type: "array",
              of: [{ type: "string" }],
              options: {
                list: [
                  { title: "Halal", value: "halal" },
                  { title: "Vegan", value: "vegan" },
                  { title: "Vegetarian", value: "vegetarian" },
                  { title: "Gluten-Free", value: "gluten-free" },
                ],
              },
            }),
            defineField({
              name: "isSignature",
              title: "Signature Dish?",
              type: "boolean",
              description: "Mark as a signature/fan-favourite dish",
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "description" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "emoji" },
    prepare({ title, subtitle }) {
      return { title: `${subtitle ?? ""} ${title ?? ""}` };
    },
  },
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
