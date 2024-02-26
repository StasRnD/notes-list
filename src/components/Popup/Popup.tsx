import React, { useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Tag } from "../Tag/Tag";
import isEqual from "lodash/isEqual";
import { updateNotes } from "../../utils";
import { NoteItemProps } from "../../types";
import { useOutsideClickPopup } from "../../hooks";

interface PopupProps {
  open: boolean;
  closePopup: VoidFunction;
  item: NoteItemProps;
  notes: NoteItemProps[];
  setNotes: React.Dispatch<React.SetStateAction<NoteItemProps[]>>;
}

export const Popup: React.FC<PopupProps> = ({
  closePopup,
  open,
  item,
  notes,
  setNotes,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Элемент для навешивание события клика вне Popup
  const containerRef = useRef<HTMLDivElement>(null);

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

      const notesForUpdate = notes.reduce(
        (acc, noteItem) => {
          if (noteItem.id === itemInForm.id) {
            return [...acc, itemInForm];
          }
          return [...acc, noteItem];
        },
        [] as PopupProps["notes"],
      );
      updateNotes({ notes: notesForUpdate, setNotes });
      closePopup();
    },

    validationSchema: Yup.object({
      title: Yup.string()
        .required("Поле обязательно для заполнения")
        .min(5, "не меньше 10 символов"),

      description: Yup.string().min(10, "Не меньше 10 символов"),
      tags: Yup.object({
        isBusiness: Yup.boolean(),
        isShopping: Yup.boolean(),
        isOther: Yup.boolean(),
      }).test("validationTags", (obj) => {
        return obj.isBusiness || obj.isShopping || obj.isOther;
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

  useOutsideClickPopup(ref, containerRef, closePopup);

  return (
    <div className={"PopupContainer"} ref={containerRef}>
      <div className={"Overlay"}></div>
      <div className={"Popup"} ref={ref}>
        <form className={"PopupForm"} onSubmit={formik.handleSubmit} noValidate>
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
          <div className={"TagContainer"}>
            <Tag
              className={"TagItem"}
              styleVariant={"business"}
              text={"business"}
              active={formik.values.tags.isBusiness}
              onClick={() => handleTagsChange("isBusiness")}
            />

            <Tag
              className={"TagItem"}
              styleVariant={"shopping"}
              text={"shopping"}
              active={formik.values.tags.isShopping}
              onClick={() => handleTagsChange("isShopping")}
            />

            <Tag
              className={"TagItem"}
              styleVariant={"other"}
              text={"other things"}
              active={formik.values.tags.isOther}
              onClick={() => handleTagsChange("isOther")}
            />

            {formik.touched.tags && formik.errors.tags && (
              <span className={"Error"}>
                Необходимо выбрать хотя бы один тег
              </span>
            )}
          </div>
          <button
            disabled={isEqual({ ...item, listItemText: "" }, formik.values)}
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};
