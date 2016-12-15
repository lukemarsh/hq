import React from 'react';
import Components from 'web/components/Components';
import styles from './styles.css';

export const Section = ({ category, sectionLoaded }) => {
  if (!category.sections.length) return null;
  return (
    <div>
      {category.sections.map(({ id, title, components }, key) =>
        <section
          {...{ key }}
          id={id}
          ref={sectionLoaded}
          className={styles.section}
          style={{ minHeight: `${document.documentElement.clientHeight}px` }}
        >
          <h1>{title}</h1>
          <Components {...{ components }} />
        </section>)}
    </div>
  );
};

Section.propTypes = {
  category: React.PropTypes.object,
  sectionLoaded: React.PropTypes.func
};

export default Section;
