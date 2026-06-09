import { defineField, defineType } from "sanity";

export const homepageSchema = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow Text",
      type: "string",
      description: 'Small label above the main heading e.g. "Premium Catering Services"',
      initialValue: "Premium Catering Services",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      description: "Main headline — first part",
      initialValue: "Food That Makes Every",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "heroTitleAccent",
      title: "Hero Title Accent (green word)",
      type: "string",
      description: "The word shown in green",
      initialValue: "Occasion",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 3,
      initialValue:
        "Weddings, corporate events, parties & celebrations — we bring exceptional cuisine and seamless service to every table.",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "heroStats",
      title: "Hero Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", type: "string", title: "Value" }),
            defineField({ name: "suffix", type: "string", title: "Suffix" }),
            defineField({ name: "label", type: "string", title: "Label" }),
          ],
          preview: {
            select: {
              title: "value",
              subtitle: "label",
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: "marqueeItems",
      title: "Marquee Ticker Items",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Homepage Settings" };
    },
  },
});