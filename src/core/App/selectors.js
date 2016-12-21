import { createSelector } from 'reselect';

const selectGlobal = () => (state) => state.get('global');

const selectCurrentUser = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('currentUser')
);

const selectCategories = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('categories').toJS()
);

const selectModalComponent = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('modalComponent').toJS()
);

const selectActiveSection = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('activeSection')
);

const selectScrolledSection = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('scrolledSection')
);

const selectSlideOutMenu = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('slideoutMenu')
);

const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route');

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectGlobal,
  selectCurrentUser,
  selectCategories,
  selectModalComponent,
  selectActiveSection,
  selectScrolledSection,
  selectSlideOutMenu,
  selectLocationState,
};
