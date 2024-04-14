import { NoteItemProps, TagProps, GroupsButtonProps } from "./types";

export const initialNotes: NoteItemProps[] = JSON.parse(
  localStorage.getItem("notes") || `[]`,
);

export const initialDataForm: NoteItemProps = {
  title: "",
  description: "",
  tags: {},
  groups: {
    isFavorite: false,
    isTrust: false,
  },

  list: [],
  id: 0,
};

const globalInitialTagsJson =
  '[{"text":"shopping","color":"#a171d2"},{"text":"business","color":"#e088d2"},{"text":"all other","color":"#eeaa79"}]';

export const initialTags: TagProps[] = JSON.parse(
  localStorage.getItem("tags") || globalInitialTagsJson,
);

export const groupsButton: GroupsButtonProps[] = [
  {
    text: "Все заметки",
    flag: null,
  },
  {
    text: "Избранное",
    flag: "isFavorite",
  },
  {
    text: "Корзина",
    flag: "isTrust",
  },
];

export const initialFilterTags = initialTags.reduce(
  (acc, tag) => {
    return { ...acc, [tag.text]: false };
  },
  {} as NoteItemProps["tags"],
);
