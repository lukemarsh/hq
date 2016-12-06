import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Helmet from 'react-helmet';
import {
  selectCurrentUser,
  selectCategories,
  selectModalComponent,
  selectActiveSection,
  selectScrolledSection
} from 'core/App/selectors';
import Modal from 'web/components/Modal';

export const App = (props) => {
  const { currentUser, categories, modalComponent, activeSection, scrolledSection, dispatch, children } = props;

  return (
    <div>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
        meta={[
          { name: 'description', content: 'A React.js Boilerplate application' },
        ]}
      />
      {children && React.cloneElement(children, { dispatch, activeSection, scrolledSection, categories, currentUser })}
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
  scrolledSection: React.PropTypes.string
};

const mapStateToProps = createSelector(
  selectCurrentUser(),
  selectCategories(),
  selectModalComponent(),
  selectActiveSection(),
  selectScrolledSection(),
  (currentUser, categories, modalComponent, activeSection, scrolledSection) => ({
    currentUser, categories, modalComponent, activeSection, scrolledSection
  })
);

export default connect(mapStateToProps)(App);
