import React from "react";
import { Form } from "antd";

const FormItem = Form.Item;

export const makeField = (Component) => ({
  input,
  meta,
  children,
  hasFeedback,
  label,
  formItemLayout,
  ...rest
}) => {
  if(input.name === "cardNumber" && input.value){
    input.value = input.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
  }

  if(input.name === "expireDateMonth" || input.name === "expireDateYear" ||  input.name === "cvv" && input.value){
    input.value = input.value.replace(/[^-.0-9]/g,'');
  }

  if(input.name === "expire" && input.value){
    input.value = input.value.replace(/[^-.0-9]/g,'');
    if(input.value.length >= 3){
      input.value =  input.value.replace(/(\d{2})/, "$1/");
    }
  }
  // console.log(input.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim(), "zdzdzd")
  const hasError = meta.touched && meta.invalid;
  return (
    <FormItem
      {...formItemLayout}
      label={label}
      validateStatus={hasError ? "error" : "success"}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
    >
      <Component {...input} {...rest} children={children} />
    </FormItem>
  );
};
