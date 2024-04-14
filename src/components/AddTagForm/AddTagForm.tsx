import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TagProps } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { addGlobalTag } from "../../store/tags/slice";
import { SelectorTags } from "../../store/tags/selectors";

interface AddTagFormProps {
  toggleOpenPopupWithAddForm: VoidFunction;
}
export const AddTagForm: React.FC<AddTagFormProps> = ({
  toggleOpenPopupWithAddForm,
}) => {
  const dispatch = useDispatch();
  const tagsList = useSelector(SelectorTags.tagsList);
  const formik = useFormik<TagProps>({
    initialValues: {
      text: "",
      color: "#aafbcd",
    },
    onSubmit: (newTag) => {
      dispatch(addGlobalTag(newTag));
      toggleOpenPopupWithAddForm();
    },

    validationSchema: Yup.object({
      text: Yup.string()
        .required()
        .min(5, "минимум 5 символов")
        .test("hasSimilarTag", (tag) => {
          return tagsList.every(
            ({ text }) =>
              text.toLowerCase().trim() !== tag?.toLowerCase().trim(),
          );
        }),
    }),
  });

  return (
    <form className={"AddTagForm"} onSubmit={formik.handleSubmit} noValidate>
      <label className={"FormLabelContainer"}>
        Текст тега
        <input
          value={formik.values.text}
          onChange={formik.handleChange}
          name={"text"}
          id={"text"}
        />
        {formik.touched.text && formik.errors.text ? (
          <span className={"Error"}>
            Такой тег уже существует или слишком короткое название
          </span>
        ) : null}
      </label>
      <label className={"FormLabelContainer"}>
        Цвет
        <input
          type={"color"}
          value={formik.values.color}
          onChange={formik.handleChange}
          name={"color"}
          id={"color"}
          style={{
            background: `${formik.values.color}`,
            width: "50px",
            height: "31px",
          }}
        />
      </label>
    </form>
  );
};
