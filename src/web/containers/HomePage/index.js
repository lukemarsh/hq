import React from 'react';
import Helmet from 'react-helmet';
import Slideout from 'slideout';
import { setClosestSection } from 'core/App/actions';
import { scrollToYWithEasing } from 'web/utils/scroll';
import Menu from 'web/components/Menu';
import Section from 'web/components/Section';
import styles from './styles.css';

let slideout;

window.addEventListener('resize', () => {
  const width = window.innerWidth;
  if (width > 780 && slideout.isOpen()) {
    slideout._opened = false;
    slideout.panel.style.transform = 'translateX(0)';
  }
});

export const HomePage = ({ dispatch, activeSection, scrolledSection, categories, currentUser }) => {
  const handleScroll = (evt) => {
    const sections = document.getElementsByTagName('section');
    let closestSection;

    for (let i = 0; i < sections.length; i += 1) {
      if (evt.target.scrollTop >= sections[i].offsetTop) {
        closestSection = sections[i];
      }
    }

    dispatch(setClosestSection(closestSection.id));
  };

  const renderPage = () => {
    const panel = document.getElementById('panel');
    const menu = document.getElementById('menu');
    const activeSectionEl = document.getElementById(scrolledSection);

    slideout = new Slideout({
      panel,
      menu,
      padding: 256,
      tolerance: 70
    });

    if (scrolledSection) {
      scrollToYWithEasing(activeSectionEl.offsetTop, 200);
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
          <Section {...{ key, category }} />
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
