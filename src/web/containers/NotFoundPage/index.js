import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export const NotFound = (props) => (
  <article>
    <h1>Page not found</h1>
    <button
      onClick={() => props.dispatch(push('/'))}
    >
    Home
    </button>
  </article>
);

NotFound.propTypes = {
  dispatch: React.PropTypes.func,
};

export default connect()(NotFound);
