import { NoteItemProps, TagProps } from "./types";

export const updateNotes = (notes: NoteItemProps[]) => {
  localStorage.setItem("notes", JSON.stringify(notes, null, 1));
};

export const updateTags = (tags: TagProps[]) => {
  localStorage.setItem("tags", JSON.stringify(tags, null, 1));
};

export const filterByTags = (
  item: NoteItemProps,
  activeTags: NoteItemProps["tags"],
) => {
  if (Object.values(activeTags).every((value) => !Boolean(value))) {
    return true;
  }

  const activeFilterTagsText = Object.keys(activeTags).filter(
    (el) => activeTags[el],
  );

  return activeFilterTagsText.some((el) => item.tags[el]);
};

export const filterBySearchValue = (
  item: NoteItemProps,
  searchValue: string,
) => {
  return (item.title + item.description + item.list.join(""))
    .toLocaleLowerCase()
    .includes(searchValue.toLocaleLowerCase().trim());
};

export const filterByActiveGroup = (
  item: NoteItemProps,
  activeGroup: keyof NoteItemProps["groups"] | null,
) => {
  if (activeGroup === "isTrust") {
    return item.groups.isTrust;
  }
  if (activeGroup === "isFavorite") {
    return item.groups.isFavorite && !item.groups.isTrust;
  }
  return !item.groups.isTrust;
};
