import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Helmet from 'react-helmet';
import {
  selectCurrentUser,
  selectCategories,
  selectModalComponent,
  selectActiveSection,
  selectScrolledSection,
  selectSlideOutMenu
} from 'core/App/selectors';
import Modal from 'web/components/Modal';

export const App = (props) => {
  const { currentUser, categories, modalComponent, activeSection, scrolledSection, slideoutMenu, dispatch, children } = props;

  return (
    <div>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
        meta={[
          { name: 'description', content: 'A React.js Boilerplate application' },
        ]}
      />
      {children && React.cloneElement(children, { dispatch, activeSection, scrolledSection, slideoutMenu, categories, currentUser })}
      <Modal {...{ modalComponent, dispatch }} />
    </div>
  );
};

App.propTypes = {
  children: React.PropTypes.node,
  currentUser: React.PropTypes.object,
  categories: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array
  ]),
  modalComponent: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  activeSection: React.PropTypes.string,
  scrolledSection: React.PropTypes.string,
  slideoutMenu: React.PropTypes.object
};

const mapStateToProps = createSelector(
  selectCurrentUser(),
  selectCategories(),
  selectModalComponent(),
  selectActiveSection(),
  selectScrolledSection(),
  selectSlideOutMenu(),
  (currentUser, categories, modalComponent, activeSection, scrolledSection, slideoutMenu) => ({
    currentUser, categories, modalComponent, activeSection, scrolledSection, slideoutMenu
  })
);

export default connect(mapStateToProps)(App);
