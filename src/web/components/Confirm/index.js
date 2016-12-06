import React from 'react';
import { toggleModal } from 'core/App/actions';

const Confirm = ({ dispatch, props }) => {
  const { text, action } = props;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(action());
    dispatch(toggleModal());
  };

  return (
    <div>
      <p>{text}</p>
      <form onSubmit={handleSubmit}>
        <button type="cancel" onClick={(e) => { e.preventDefault(); dispatch(toggleModal()); }}>Cancel</button>
        <button autoFocus type="submit">Yes</button>
      </form>
    </div>
  );
};

Confirm.propTypes = {
  dispatch: React.PropTypes.func,
  props: React.PropTypes.object,
  text: React.PropTypes.string,
  action: React.PropTypes.func
};

export default Confirm;
