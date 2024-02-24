export interface NoteItem {
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
  tags: NoteItem["tags"];
  groups: keyof NoteItem["groups"] | null;
};
