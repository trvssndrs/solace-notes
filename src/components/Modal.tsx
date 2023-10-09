import React, { Dispatch, SetStateAction } from "react";
import { styled } from "styled-components";

const ModalWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  top: 25vh;
  background-color: white;
  border: 1px solid black;
  padding: 2rem;
  border: 1px solid rgb(40, 94, 80);
  border-radius: 10px;
  min-width: 425px;
`;

export const ModalMessage = styled.p`
  font-size: 1.125rem;
`;

export const ModalGroup = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
`;

export const Modal: React.FC<{
  setIsActive: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}> = ({ setIsActive, children }) => (
  <ModalWrapper onClick={() => setIsActive(false)}>
    <ModalBox>{children}</ModalBox>
  </ModalWrapper>
);
