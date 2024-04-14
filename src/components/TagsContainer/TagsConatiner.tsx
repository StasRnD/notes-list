import { Tag } from "../Tag/Tag";
import React, { PropsWithChildren } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectorTags } from "../../store/tags/selectors";
import { updateActiveTags } from "../../store/tags/slice";
type TagsContainerProps = {
  className?: string;
} & (
  | {
      toNoteForm?: true;
      onClickToTag: (tagName: string) => void;
      tagsToForm: { [key: string]: boolean };
    }
  | {
      toNoteForm?: false;
    }
);

export const TagsContainer: React.FC<PropsWithChildren<TagsContainerProps>> = (
  props,
) => {
  const { className, toNoteForm, children } = props;
  const tagsList = useSelector(SelectorTags.tagsList);
  const dispatch = useDispatch();

  const handleClick = (tagName: string) => {
    if (toNoteForm) {
      props.onClickToTag(tagName);
      return;
    } else {
      dispatch(updateActiveTags(tagName));
    }
  };

  return (
    <div className={`TagContainer ${className || ""}`}>
      {tagsList.map((tag) => {
        return (
          <Tag
            active={toNoteForm && props.tagsToForm[tag.text]}
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
