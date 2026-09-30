import { getCollection, type CollectionEntry } from 'astro:content';

export type Note = CollectionEntry<'notes'>;

/** 全部文章，按发布日期从新到旧排列。 */
export const getNotes = async () =>
  (await getCollection('notes')).sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

export const getNoteUrl = (note: Note) => `/notes/${note.id}`;
