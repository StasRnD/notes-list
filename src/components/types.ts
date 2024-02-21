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
}
