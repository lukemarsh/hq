import React from 'react';

export const TextComponent = ({ data }) => (
  <div>
    <div contentEditable="true" dangerouslySetInnerHTML={{ __html: data }} />
  </div>
);

TextComponent.propTypes = {
  data: React.PropTypes.string
};

export default TextComponent;
