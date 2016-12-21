import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export const NotFound = ({ onClick }) => (
  <article>
    <h1>Page not found</h1>
    <button
      onClick={onClick}
    >
    Home
    </button>
  </article>
);

NotFound.propTypes = {
  onClick: React.PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
  onClick: () => dispatch(push('/'))
});

export default connect(null, mapDispatchToProps)(NotFound);
