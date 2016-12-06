import React from 'react';
import { createSection, toggleModal } from 'core/App/actions';

const NewSection = ({ dispatch, props }) => {
  const { category } = props;
  let title = '';

  const handleChange = (evt) => {
    title = evt.target.value;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(createSection(category, title));
    dispatch(toggleModal());
  };

  return (
    <div>
      <h3>Create New Section in {category.title}</h3>
      <form onSubmit={handleSubmit}>
        <input autoFocus type="text" maxLength={20} onChange={handleChange} />
        <button>Create Section</button>
      </form>
    </div>
  );
};

NewSection.propTypes = {
  dispatch: React.PropTypes.func,
  props: React.PropTypes.object,
  category: React.PropTypes.object
};

export default NewSection;
