import React from 'react';
import Component from 'web/components/Component';

export const Components = ({ components }) => {
  if (!components.length) return null;
  return (
    <div>
      {components.map((component, key) =>
        <Component {...{ key, component }} />
      )}
    </div>
  );
};

Components.propTypes = {
  components: React.PropTypes.array
};

export default Components;
