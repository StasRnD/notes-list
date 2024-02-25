import { NoteItemProps } from "../types";

export const filterByTags = (
  item: NoteItemProps,
  filterSetting: NoteItemProps["tags"],
) => {
  if (Object.values(filterSetting).every((value) => !Boolean(value))) {
    return true;
  }
  return (
    (item.tags.isBusiness && filterSetting.isBusiness) ||
    (item.tags.isShopping && filterSetting.isShopping) ||
    (item.tags.isOther && filterSetting.isOther)
  );
};
