export interface NoteItemProps {
  title: string;
  description: string;
  tags: {
    [key: string]: boolean;
  };

  list: string[];
  id: number;
  groups: {
    isFavorite: boolean;
    isTrust: boolean;
  };
}

export interface TagProps {
  text: string;
  color: string;
}

export type FilterSetting = {
  tags: NoteItemProps["tags"];
  groups: keyof NoteItemProps["groups"] | null;
};
