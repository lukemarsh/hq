import React from 'react';

export const ImageComponent = ({ data }) => (
  <div>
    <div>{data}</div>
  </div>
);

ImageComponent.propTypes = {
  data: React.PropTypes.object
};

export default ImageComponent;
