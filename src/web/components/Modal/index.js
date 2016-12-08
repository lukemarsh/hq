import React from 'react';
import { toggleModal } from 'core/App/actions';
import { modalComponents } from 'web/components/Modal/config';
import styles from './styles.css';

const Modal = ({ modalComponent, dispatch }) => {
  const Component = modalComponents[modalComponent.component];
  const props = modalComponent.props;

  const handleKeyDown = (evt) => {
    if (evt.keyCode === 27) {
      dispatch(toggleModal());
    }
  };

  if (!Component) return null;
  return (
    <div className={styles.modalContainer} onKeyDown={handleKeyDown}>
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
