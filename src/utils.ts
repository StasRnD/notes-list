import { NoteItemProps, TagProps } from "./types";

export const updateNotes = (notes: NoteItemProps[]) => {
  localStorage.setItem("notes", JSON.stringify(notes, null, 1));
};

export const updateTags = (tags: TagProps[]) => {
  localStorage.setItem("tags", JSON.stringify(tags, null, 1));
};

export const filterByTags = (
  item: NoteItemProps,
  filterSetting: NoteItemProps["tags"],
) => {
  if (Object.values(filterSetting).every((value) => !Boolean(value))) {
    return true;
  }

  const activeFilterTagsText = Object.keys(filterSetting).filter(
    (el) => filterSetting[el],
  );

  return activeFilterTagsText.some((el) => item.tags[el]);
};
