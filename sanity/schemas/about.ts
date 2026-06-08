import { defineField, defineType } from "sanity";

export const aboutSchema = defineType({
  name: "about",
  title: "About Page",
  type: "document",
  // Singleton — only one document
  __experimental_actions: ["update", "publish"],
  fields: [
    defineField({
      name: "tagline",
      title: "Page Tagline",
      type: "string",
      description: "Shown under the hero headline on the About page",
      initialValue:
        "Born from a love of Nigerian cuisine, built on a promise of exceptional service.",
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: "story",
      title: "Our Story",
      type: "text",
      rows: 10,
      description:
        "Separate paragraphs with a blank line. Each paragraph renders independently.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mission",
      title: "Mission Statement",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "teamMembers",
      title: "Team Members",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", title: "Full Name", validation: (Rule) => Rule.required() }),
            defineField({ name: "role", type: "string", title: "Role / Title", validation: (Rule) => Rule.required() }),
            defineField({ name: "bio", type: "text", title: "Bio", rows: 3, validation: (Rule) => Rule.required().max(300) }),
            defineField({ name: "initials", type: "string", title: "Initials (2–3 chars)", validation: (Rule) => Rule.required().max(3) }),
            defineField({
              name: "image",
              type: "image",
              title: "Photo (optional)",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
            }),
          ],
          preview: { select: { title: "name", subtitle: "role" } },
        },
      ],
    }),
    defineField({
      name: "milestones",
      title: "Company Milestones",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "year", type: "string", title: "Year", validation: (Rule) => Rule.required() }),
            defineField({ name: "label", type: "string", title: "Milestone Description", validation: (Rule) => Rule.required().max(120) }),
          ],
          preview: { select: { title: "year", subtitle: "label" } },
        },
      ],
      description: "Add milestones in chronological order",
    }),
  ],
  preview: {
    prepare() {
      return { title: "About Page" };
    },
  },
});
