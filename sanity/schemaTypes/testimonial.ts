import { defineField, defineType } from "sanity";

export const testimonialSchema = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "initials",
      title: "Initials (2 letters)",
      type: "string",
      description: "Used for the avatar placeholder e.g. AO",
      validation: (Rule) => Rule.required().max(3),
    }),
    defineField({
      name: "eventType",
      title: "Event Type",
      type: "string",
      description: 'e.g. "Wedding Reception"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: 'e.g. "Lagos"',
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      description: 'e.g. "2024"',
    }),
    defineField({
      name: "quote",
      title: "Testimonial Quote",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "rating",
      title: "Star Rating",
      type: "number",
      initialValue: 5,
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "eventType" },
  },
});
