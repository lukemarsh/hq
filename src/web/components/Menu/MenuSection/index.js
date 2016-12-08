import React from 'react';
import { toggleModal, deleteSection, scrollToSection } from 'core/App/actions';
import styles from './styles.css';

const MenuSection = ({ dispatch, activeSection, category, section }) => (
  <li
    className={styles.section}
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
          { text: 'Are you sure you want to delete?',
            title: 'Confirm',
            action: () => deleteSection(category, section.id) }
        )
      )}
    />
  </li>
);

MenuSection.propTypes = {
  category: React.PropTypes.object,
  section: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  activeSection: React.PropTypes.string
};

export default MenuSection;
