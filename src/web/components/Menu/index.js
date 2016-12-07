import React from 'react';
import { toggleModal, deleteSection, scrollToSection } from 'core/App/actions';
import styles from './styles.css';

export const Menu = ({ categories, activeSection, currentUser, dispatch }) => (
  <div id="menu" className={styles.menu}>
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
        <li {...{ key }}>
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
            {category.sections.map((section, k) =>
              <li
                className={styles.section}
                {...{ key: k }}
              >
                <a
                  href
                  onClick={(evt) => {
                    evt.preventDefault();
                    dispatch(scrollToSection(section.id));
                  }}
                >
                  <span
                    className={activeSection === section.id ? styles.active : null}
                  >
                    {section.title}
                  </span>
                </a>
                <span
                  className="icon icon-circle-cross"
                  onClick={() => dispatch(
                    toggleModal('confirm',
                      { text: `Are you sure you want to delete ${section.title}?`,
                        title: 'Confirm',
                        action: () => deleteSection(category, section.id)
                      }
                    )
                  )}
                />
              </li>
            )}
          </ul>
        </li>
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
