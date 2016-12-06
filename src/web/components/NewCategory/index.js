import React from 'react';
import { createCategory, toggleModal } from 'core/App/actions';

const NewCategory = ({ dispatch }) => {
  let title = '';

  const handleChange = (evt) => {
    title = evt.target.value;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(createCategory(title));
    dispatch(toggleModal());
  };

  return (
    <div>
      <h2>Create New Category</h2>
      <form onSubmit={handleSubmit}>
        <input autoFocus type="text" maxLength={20} onChange={handleChange} />
        <button>Create Category</button>
      </form>
    </div>
  );
};

NewCategory.propTypes = {
  dispatch: React.PropTypes.func
};

export default NewCategory;
