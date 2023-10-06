import { styled } from "styled-components";

const Form = styled.form`
  width: 45rem;
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const Label = styled.span``;

export const Input = styled.input`
  max-width: 20ch;
`;

export const TextArea = styled.textarea`
  max-width: 60ch;
`;

export default Form;
