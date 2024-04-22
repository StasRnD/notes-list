import isEqual from "lodash/isEqual";
import React, { useState } from "react";
import { useFormik } from "formik";
import { NoteItemProps } from "../../types";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addNote, updateNote } from "../../store/notes/slice";
import { SelectorNotes } from "../../store/notes/selectors";
import { TagsContainer } from "../TagsContainer/TagsConatiner";
import { Popup } from "../Popup/Popup";
import { AddTagForm } from "../AddTagForm/AddTagForm";

interface NoteFormProps {
  closePopup: VoidFunction;
}

export const NoteForm: React.FC<NoteFormProps> = ({ closePopup }) => {
  const [openPopupWithAddTagForm, setOpenPopupWithAddTagForm] =
    useState<boolean>(false);

  const handleToggleOpenPopupWithAddTagForm = () => {
    setOpenPopupWithAddTagForm((openValue) => !openValue);
  };

  const dispatch = useDispatch();
  const tagsList = useSelector(SelectorNotes.tagsList);
  const notesList = useSelector(SelectorNotes.notesList);
  const noteToForm = useSelector(SelectorNotes.noteToForm);

  const formik = useFormik<NoteItemProps & { listItemText: string }>({
    initialValues: {
      ...noteToForm,
      listItemText: "",
    },
    onSubmit: ({ listItemText, ...itemInForm }) => {
      /**
       * id = 0, когда создаётся новый itemNote.
       */
      if (itemInForm.id === 0) {
        itemInForm.id = notesList.length + 1;
        dispatch(addNote(itemInForm));
        closePopup();
        return;
      }
      dispatch(updateNote(itemInForm));
      closePopup();
    },

    validationSchema: Yup.object({
      title: Yup.string()
        .required("Поле обязательно для заполнения")
        .min(5, "не меньше 10 символов"),

      description: Yup.string().min(10, "Не меньше 10 символов"),
      tags: Yup.object()
        .shape(
          tagsList.reduce(
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
    <>
      <Popup
        open={openPopupWithAddTagForm}
        title={"Добавить тег"}
        closePopup={handleToggleOpenPopupWithAddTagForm}
      >
        <AddTagForm
          toggleOpenPopupWithAddForm={handleToggleOpenPopupWithAddTagForm}
        />
      </Popup>
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
        <div className={"WrapperTagsAndAddTagButton"}>
          <TagsContainer
            className={"TagContainerInNoteForm"}
            toNoteForm
            tagsToForm={formik.values.tags}
            onClickToTag={handleTagsChange}
          >
            {formik.touched.tags && formik.errors.tags && (
              <span className={"Error"}>
                Необходимо выбрать хотя бы один тег
              </span>
            )}
          </TagsContainer>

          <button
            className={"AddTag"}
            type={"button"}
            onClick={handleToggleOpenPopupWithAddTagForm}
          >
            Добавить тег
          </button>
        </div>
        <button
          disabled={isEqual({ ...noteToForm, listItemText: "" }, formik.values)}
        >
          Отправить
        </button>
      </form>
    </>
  );
};
