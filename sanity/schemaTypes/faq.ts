import { defineField, defineType } from "sanity";

export const faqSchema = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Booking & Planning",  value: "Booking & Planning" },
          { title: "Menu & Food",         value: "Menu & Food" },
          { title: "Service & Logistics", value: "Service & Logistics" },
          { title: "Pricing",             value: "Pricing" },
          { title: "General",             value: "General" },
        ],
      },
      initialValue: "General",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 99,
    }),
  ],
  preview: {
    select: { title: "question", subtitle: "category" },
  },
  orderings: [
    { title: "Category + Order", name: "categoryOrder", by: [{ field: "category", direction: "asc" }, { field: "order", direction: "asc" }] },
  ],
});
