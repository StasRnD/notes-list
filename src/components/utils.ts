import { State, FilterSettingProps } from "../App";

export const filterByTags = (
  item: State,
  filterSetting: FilterSettingProps,
) => {
  if (Object.values(filterSetting).every((value) => !Boolean(value))) {
    return true;
  }
  return (
    (item.tags.isBus && filterSetting.isBus) ||
    (item.tags.isShop && filterSetting.isShop) ||
    (item.tags.isOther && filterSetting.isOther)
  );
};
