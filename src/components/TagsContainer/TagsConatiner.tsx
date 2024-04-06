import { Tag } from "../Tag/Tag";
import { updateTagForFilterSetting } from "../../store/notes/slice";
import React, { PropsWithChildren } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectorTags } from "../../store/tags/selectors";
type TagsContainerProps = {
  className?: string;
  allTagList: { [key: string]: boolean };
} & (
  | {
      toNoteForm?: true;
      onClickToTag: (tagName: string) => void;
    }
  | {
      toNoteForm?: false;
    }
);

export const TagsContainer: React.FC<PropsWithChildren<TagsContainerProps>> = (
  props,
) => {
  const { className, allTagList, toNoteForm, children } = props;

  const tagsList = useSelector(SelectorTags.tagsList);
  const dispatch = useDispatch();

  const handleClick = (tagName: string) => {
    if (toNoteForm) {
      props.onClickToTag(tagName);
      return;
    } else {
      dispatch(updateTagForFilterSetting(tagName));
    }
  };

  return (
    <div className={`TagContainer ${className || ""}`}>
      {tagsList.map((tag) => {
        return (
          <Tag
            active={allTagList[tag.text]}
            text={tag.text}
            onClick={() => handleClick(tag.text)}
            style={{ background: `${tag.color}` }}
          />
        );
      })}
      {children}
    </div>
  );
};
