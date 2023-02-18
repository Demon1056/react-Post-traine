import styled from 'styled-components';
import { Form, Field, ErrorMessage } from 'formik';
export const FormStyles = styled(Form)`
  margin: 0 auto;
  padding: 20px;
  width: 250px;
  height: auto;
  border-radius: 5%;
  text-align: center;
  border: 4px solid aqua;
  border-radius: 5%;
`;
export const FieldStyles = styled(Field)`
  margin-bottom: 10px;
`;
export const ErrorMessageStyled = styled(ErrorMessage)`
  display: block;
  color: red;
  font-size: 10px;
  text-align: center;
  border: 1px solid red;
`;
