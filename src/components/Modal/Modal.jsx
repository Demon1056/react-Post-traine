import { createPortal } from 'react-dom';
import { useEffect } from 'react';

import {
  Backdrop,
  ModalWraper,
  ButtonClose,
  ModalContainer,
  ModalText,
  ButtonsContainer,
  ButtonYes,
  ButtonNo,
} from './ModalStyled';

const modalRoot = document.querySelector('#modal-root');

const LogOutModal = ({ closeModal, agreeLogout, question }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  const handleButtonClick = () => {
    agreeLogout();
    closeModal();
  };

  return createPortal(
    <Backdrop onClick={handleBackdropClick}>
      <ModalWraper>
        <ButtonClose onClick={handleBackdropClick}>&#10005;</ButtonClose>
        <ModalContainer>
          <ModalText>
            <p>{question}</p>
          </ModalText>
          <ButtonsContainer>
            <ButtonYes onClick={handleButtonClick}>YES </ButtonYes>
            <ButtonNo onClick={handleBackdropClick}>NO</ButtonNo>
          </ButtonsContainer>
        </ModalContainer>
      </ModalWraper>
    </Backdrop>,
    modalRoot
  );
};

export default LogOutModal;
