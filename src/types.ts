export interface NoteItemProps {
  title: string;
  description: string;
  tags: {
    isBusiness: boolean;
    isShopping: boolean;
    isOther: boolean;
  };

  list: string[];
  id: number;
  groups: {
    isFavorite: boolean;
    isTrust: boolean;
  };
}

export type FilterSetting = {
  tags: NoteItemProps["tags"];
  groups: keyof NoteItemProps["groups"] | null;
};
