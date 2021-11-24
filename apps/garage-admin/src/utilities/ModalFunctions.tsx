import { FormInstance } from 'antd';
import { ValidationValueTypes } from 'src/types/adminTypes';

const checkForUndefined = (object: ValidationValueTypes) => {
  const valueArray = Object.values(object);
  return valueArray.includes(typeof undefined);
};

const isValidateAndShowButton = (form: FormInstance) => {
  const isErrors = form.getFieldsError().some((field) => field.errors.length > 0);
  const valueObj = form.getFieldsValue();
  const isUndefined = checkForUndefined(valueObj);

  if (isErrors || isUndefined) {
    return true;
  }
  return false;
};

export default isValidateAndShowButton;
