import React from 'react';
import { toggleModal } from 'core/App/actions';
import { modalComponents } from 'web/components/Modal/config';
import styles from './styles.css';

const Modal = ({ modalComponent, dispatch }) => {
  const Component = modalComponents[modalComponent.get('component')];
  const props = modalComponent.get('props');

  document.onkeydown = (evt = evt || window.event) => {
    let isEscape = false;
    if ('key' in evt) {
      isEscape = (evt.key === 'Escape' || evt.key === 'Esc');
    } else {
      isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
      dispatch(toggleModal());
    }
  };

  if (!Component) return null;
  return (
    <div className={styles.modalContainer}>
      <div
        className={styles.overlay}
        onClick={() => dispatch(toggleModal())}
      />
      <div className={styles.modal}>
        { props && props.title && <div className={styles.title}>{props.title}</div> }
        <div className={styles.body}>
          <Component {...{ dispatch, props }} />
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  modalComponent: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  title: React.PropTypes.string
};

export default Modal;
