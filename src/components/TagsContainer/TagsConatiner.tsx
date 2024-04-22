import { Tag } from "../Tag/Tag";
import React, { PropsWithChildren } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectorNotes } from "../../store/notes/selectors";
import { reorderTagsList, updateActiveTags } from "../../store/notes/slice";
import {
  DragDropContext,
  OnDragEndResponder,
  Droppable,
} from "react-beautiful-dnd";

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
  const tagsList = useSelector(SelectorNotes.tagsList);
  const activeTags = useSelector(SelectorNotes.activeTags);
  const dispatch = useDispatch();

  const handleClick = (tagName: string) => {
    if (toNoteForm) {
      props.onClickToTag(tagName);
      return;
    } else {
      dispatch(updateActiveTags(tagName));
    }
  };
  const handleOnDragEnd: OnDragEndResponder = (props) => {
    const { source, destination } = props;

    if (!destination) return;
    if (source.droppableId === destination.droppableId) {
      dispatch(reorderTagsList({ from: source.index, to: destination.index }));
    }
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId={toNoteForm ? "dropNote" : "droppableId"}>
        {(provided) => (
          <ul
            className={`TagContainer ${className || ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tagsList.map((tag, index) => {
              return (
                <Tag
                  key={tag.text}
                  index={index}
                  style={{ background: `${tag.color}` }}
                  onClick={() => handleClick(tag.text)}
                  text={tag.text}
                  active={
                    (toNoteForm ? props.tagsToForm : activeTags)[tag.text]
                  }
                />
              );
            })}
            {children}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
    // {/*{tagsList.map((tag) => {*/}
    // {/*  return (*/}
    // {/*    <Tag*/}
    // {/*      active={(toNoteForm ? props.tagsToForm : activeTags)[tag.text]}*/}
    // {/*      text={tag.text}*/}
    // {/*      onClick={() => handleClick(tag.text)}*/}
    // {/*      style={{ background: `${tag.color}` }}*/}
    // {/*    />*/}
    // {/*  );*/}
    // {/*})}*/}
    // {/*{children}*/}
  );
};
