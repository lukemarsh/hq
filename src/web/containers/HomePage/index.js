import React from 'react';
import Helmet from 'react-helmet';
import Slideout from 'slideout';
import { find, propEq, prop, compose } from 'ramda';
import { setClosestSection } from 'core/App/actions';
import { scrollToYWithEasing } from 'web/utils/scroll';
import Menu from 'web/components/Menu';
import Section from 'web/components/Section';
import styles from './styles.css';

const sections = [];
let slideout;

window.addEventListener('resize', () => {
  const width = window.innerWidth;
  if (width > 780 && slideout.isOpen()) {
    slideout._opened = false;
    slideout.panel.style.transform = 'translateX(0)';
  }
});

const sectionLoaded = (section) => {
  sections.push({ id: section.id, offsetTop: section.offsetTop });
};

export const HomePage = ({ dispatch, activeSection, scrolledSection, categories, currentUser }) => {
  const handleScroll = (evt) => {
    dispatch(setClosestSection(evt.target.scrollTop, sections));
  };

  const renderPage = () => {
    const panel = document.getElementById('panel');
    const menu = document.getElementById('menu');

    slideout = new Slideout({
      panel,
      menu,
      padding: 256,
      tolerance: 70
    });

    if (scrolledSection) {
      const scrolledSectionOffsetTop = compose(prop('offsetTop'), find(propEq('id', scrolledSection)))(sections);
      scrollToYWithEasing(scrolledSectionOffsetTop, 200);
    }
  };
  return (
    <div ref={renderPage}>
      <Helmet
        title="Home Page"
        meta={[
          { name: 'description', content: 'A React.js Boilerplate application homepage' },
        ]}
      />
      <Menu {...{ dispatch, categories, activeSection, currentUser }} />
      <div id="panel" onScroll={handleScroll} className={styles.panel}>
        <div className="fixed">
          <button className={styles.toggle} onClick={() => slideout.toggle()}>toggle</button>
        </div>
        {categories.map((category, key) =>
          <Section {...{ key, category, sectionLoaded }} />
        )}
      </div>
    </div>
  );
};

HomePage.propTypes = {
  categories: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array
  ]),
  currentUser: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  activeSection: React.PropTypes.string,
  scrolledSection: React.PropTypes.string
};

export default HomePage;
