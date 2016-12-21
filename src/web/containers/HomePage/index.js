import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { find, propEq, prop, compose, head, last } from 'ramda';
import { setClosestSection, initializeSlideoutMenu } from 'core/App/actions';
import { scrollToYWithEasing } from 'web/utils/scroll';
import Menu from 'web/components/Menu';
import Section from 'web/components/Section';
import styles from './styles.css';

const sections = [];

export const sectionLoaded = (section) => {
  if (section) {
    sections.push({ id: section.id, offsetTop: section.offsetTop });
  }
  return sections;
};

export const HomePage = ({ activeSection, dispatch, onInitializeSlideoutMenu, onSetClosestSection, scrolledSection, categories, slideoutMenu, currentUser }) => {
  const handleScroll = (evt) => {
    onSetClosestSection(evt.target.scrollTop, sections);
  };

  const init = (container) => {
    if (container) {
      const panel = last(container.children);
      const menu = head(container.children);
      initializeSlideout(panel, menu);
      scrollToSection(panel);
    }
  };

  const scrollToSection = (panel) => {
    if (scrolledSection) {
      const scrolledSectionOffsetTop = compose(prop('offsetTop'), find(propEq('id', scrolledSection)))(sections);
      scrollToYWithEasing(panel, scrolledSectionOffsetTop, 200);
    }
  };

  const initializeSlideout = (panel, menu) => {
    if (!slideoutMenu) {
      onInitializeSlideoutMenu(panel, menu);
    }
  };
  return (
    <div>
      <div ref={init}>
        <Helmet
          title="Home Page"
          meta={[
            { name: 'description', content: 'A React.js Boilerplate application homepage' },
          ]}
        />
        <Menu {...{ dispatch, categories, activeSection, currentUser }} />
        <div onScroll={handleScroll} className={styles.panel}>
          <div className="fixed">
            <button className={styles.toggle} onClick={() => slideoutMenu.toggle()}>toggle</button>
          </div>
          {categories.map((category, key) =>
            <Section {...{ key, category, sectionLoaded }} />
          )}
        </div>
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
  scrolledSection: React.PropTypes.string,
  slideoutMenu: React.PropTypes.object,
  onInitializeSlideoutMenu: React.PropTypes.func,
  onSetClosestSection: React.PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
  onSetClosestSection: (scrollTop) => dispatch(setClosestSection(scrollTop, sections)),
  onInitializeSlideoutMenu: (panel, menu) => dispatch(initializeSlideoutMenu(panel, menu))
});

export default connect(null, mapDispatchToProps)(HomePage);
