import React from 'react';
import { toggleModal } from 'core/App/actions';
import MenuSection from 'web/components/Menu/MenuSection';
import styles from './styles.css';

const MenuCategory = ({ category, activeSection, dispatch }) => (
  <li>
    <span className={styles.categoryTitle}>
      {category.title}
      <span
        className="icon icon-circle-plus"
        onClick={(evt) => {
          evt.preventDefault();
          dispatch(toggleModal('newSection', { category, title: 'New section' }));
        }}
      />
    </span>
    <ul>
      {category.sections.map((section, key) =>
        <MenuSection {...{ key, dispatch, activeSection, category, section }} />
      )}
    </ul>
  </li>
);

MenuCategory.propTypes = {
  category: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  activeSection: React.PropTypes.string
};

export default MenuCategory;
