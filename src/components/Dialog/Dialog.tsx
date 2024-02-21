import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Tag } from "../Tag/Tag";
import isEqual from "lodash/isEqual";
import { updateNotes } from "../../utils";
import { NoteItem } from "../types";

interface DialogProps {
  toggleOpen: VoidFunction;
  item: NoteItem;
  notes: NoteItem[];
  setNotes: React.Dispatch<React.SetStateAction<NoteItem[]>>;
}

export const Dialog: React.FC<DialogProps> = ({
  toggleOpen,
  item,
  notes,
  setNotes,
}) => {
  const formik = useFormik<NoteItem & { listItemText: string }>({
    initialValues: {
      ...item,
      listItemText: "",
    },
    onSubmit: ({ listItemText, ...itemInForm }) => {
      if (itemInForm.id === 0) {
        itemInForm.id = notes.length + 1;
        updateNotes({ notes: [...notes, itemInForm], setNotes });
      }

      if (itemInForm.id === item.id) {
        const notesForUpdate = notes.reduce(
          (acc, noteItem) => {
            if (noteItem.id === itemInForm.id) {
              return [...acc, itemInForm];
            }
            return [...acc, noteItem];
          },
          [] as DialogProps["item"][],
        );
        updateNotes({ notes: notesForUpdate, setNotes });
      }
      toggleOpen();
    },

    validationSchema: Yup.object({
      title: Yup.string()
        .required("Поле обязательно для заполнения")
        .min(5, "не меньше 10 символов"),

      description: Yup.string().min(5, "Не менбше 10 букв"),
      tags: Yup.object({
        isBus: Yup.boolean(),
        isShop: Yup.boolean(),
        isOther: Yup.boolean(),
      }).test("validationTags", (obj) => {
        return obj.isShop || obj.isBus || obj.isOther;
      }),
      listItemText: Yup.string().min(5, "минимум 5 букв"),
    }),
  });

  const handleCheckboxChange = (name: keyof NoteItem["tags"]) => {
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
    <div className={"DialogContainer"}>
      <div className={"Overlay"}></div>
      <div className={"Dialog"}>
        <form
          className={"DialogForm"}
          onSubmit={formik.handleSubmit}
          noValidate
        >
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
            <label className={"FormLabelContainer"}></label>
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
              variant={"business"}
              active={formik.values.tags.isBusiness}
              onClick={() => handleCheckboxChange("isBusiness")}
            />

            <Tag
              className={"TagItem"}
              variant={"shopping"}
              active={formik.values.tags.isShopping}
              onClick={() => handleCheckboxChange("isShopping")}
            />

            <Tag
              className={"TagItem"}
              variant={"all other"}
              active={formik.values.tags.isOther}
              onClick={() => handleCheckboxChange("isOther")}
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
