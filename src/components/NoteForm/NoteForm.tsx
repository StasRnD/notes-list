import { Tag } from "../Tag/Tag";
import isEqual from "lodash/isEqual";
import React from "react";
import { useFormik } from "formik";
import { NoteItemProps, TagProps } from "../../types";
import { addTags, updateNotes } from "../../utils";
import { produce } from "immer";
import * as Yup from "yup";

interface NoteFormProps {
  item: NoteItemProps;
  notes: NoteItemProps[];
  setNotes: React.Dispatch<React.SetStateAction<NoteItemProps[]>>;
  closePopup: VoidFunction;
  tags: TagProps[];
  setTags: React.Dispatch<React.SetStateAction<TagProps[]>>;
}

export const NoteForm: React.FC<NoteFormProps> = ({
  item,
  notes,
  setNotes,
  closePopup,
  tags,
  setTags,
}) => {
  const formik = useFormik<NoteItemProps & { listItemText: string }>({
    initialValues: {
      ...item,
      listItemText: "",
    },
    onSubmit: ({ listItemText, ...itemInForm }) => {
      /**
       * id = 0, когда создаётся новый itemNote.
       */
      if (itemInForm.id === 0) {
        itemInForm.id = notes.length + 1;
        updateNotes({ notes: [...notes, itemInForm], setNotes });
        closePopup();
        return;
      }

      const nextState = produce(notes, (draftState) => {
        draftState[itemInForm.id - 1] = itemInForm;
      });
      updateNotes({ notes: nextState, setNotes });
      closePopup();
    },

    validationSchema: Yup.object({
      title: Yup.string()
        .required("Поле обязательно для заполнения")
        .min(5, "не меньше 10 символов"),

      description: Yup.string().min(10, "Не меньше 10 символов"),
      tags: Yup.object()
        .shape(
          tags.reduce(
            (acc, tag) => {
              return { ...acc, [tag.text]: Yup.boolean() };
            },
            {} as { [key: string]: Yup.BooleanSchema<boolean | undefined> },
          ),
        )
        .test("validationTags", (obj) => {
          return Object.values(obj).some((el) => Boolean(el));
        }),
      listItemText: Yup.string().min(5, "минимум 5 букв"),
    }),
  });

  const handleTagsChange = (name: keyof NoteItemProps["tags"]) => {
    formik.setFieldValue(`tags.${name}`, !formik.values.tags[name]);
  };

  const addListItem = () => {
    formik.setFieldValue(`list`, [
      ...formik.values.list,
      formik.values.listItemText,
    ]);
    formik.setFieldValue(`listItemText`, "");
  };
  return (
    <form className={"NoteForm"} onSubmit={formik.handleSubmit} noValidate>
      <label className={"FormLabelContainer"}>
        Заголовок
        <input
          placeholder={"Заголовок"}
          value={formik.values.title}
          onChange={formik.handleChange}
          name={"title"}
          id={"title"}
        />
        {formik.touched.title && formik.errors.title ? (
          <span className={"Error"}>{formik.errors.title}</span>
        ) : null}
      </label>

      <label className={"FormLabelContainer"}>
        Заголовок
        <input
          placeholder={"Текст"}
          value={formik.values.description}
          onChange={formik.handleChange}
          name={"description"}
          id={"description"}
        />
        {formik.touched.description && formik.errors.description ? (
          <span className={"Error"}>{formik.errors.description}</span>
        ) : null}
      </label>
      <label className={"FormLabelContainer"}>
        Список дел (не меньше 5 символов)
        <input
          placeholder={"Текст пункта"}
          value={formik.values.listItemText}
          onChange={formik.handleChange}
          name={"listItemText"}
          id={"listItemText"}
        />
        {formik.touched.listItemText && formik.errors.listItemText ? (
          <span className={"Error"}>{formik.errors.listItemText}</span>
        ) : null}
      </label>
      {formik.values.list.length > 0 && (
        <ul>
          {formik.values.list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
      <button
        disabled={formik.values.listItemText.length < 5}
        type={"button"}
        onClick={addListItem}
      >
        Добавить пункт
      </button>
      <button
        type={"button"}
        onClick={() => {
          if (tags.map((tag) => tag.text).includes("mother")) {
            return;
          }
          addTags({
            tags: [...tags, { text: "mother", color: "green" }],
            setTags,
          });
        }}
      >
        добавить тег
      </button>
      <div className={"TagContainer"}>
        {tags.map((tag) => {
          return (
            <Tag
              text={tag.text}
              style={{ background: `${tag.color}` }}
              active={formik.values.tags[tag.text]}
              onClick={() => handleTagsChange(tag.text)}
            />
          );
        })}

        {formik.touched.tags && formik.errors.tags && (
          <span className={"Error"}>Необходимо выбрать хотя бы один тег</span>
        )}
      </div>
      <button disabled={isEqual({ ...item, listItemText: "" }, formik.values)}>
        Отправить
      </button>
    </form>
  );
};
