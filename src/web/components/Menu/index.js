import React from 'react';
import MenuCategory from 'web/components/Menu/MenuCategory';
import { toggleModal } from 'core/App/actions';
import styles from './styles.css';

export const Menu = ({ categories, activeSection, currentUser, dispatch }) => (
  <div className={styles.menu}>
    <div className={styles.title}>
      <h2>The App Business</h2>
      {currentUser.displayName}
    </div>
    <div className={styles.categoriesTitle}>
      <span>CATEGORIES</span>
      <span
        className="icon icon-circle-plus"
        onClick={() => dispatch(toggleModal('newCategory', {
          title: 'New Category'
        }))}
      />
    </div>
    <ul>
      {categories.map((category, key) =>
        <MenuCategory {...{ key, category, activeSection, dispatch }} />
      )}
    </ul>
  </div>
);

Menu.propTypes = {
  categories: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array
  ]),
  currentUser: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  activeSection: React.PropTypes.string
};

export default Menu;
