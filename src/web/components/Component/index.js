import React from 'react';
import List from 'web/components/List';
import TextComponent from 'web/components/TextComponent';
import ImageComponent from 'web/components/ImageComponent';

export const Component = ({ component }) => (
  <div>
    {component.data.map(({ componentType, data }, key) => {
      switch (componentType) {
        case 'TextComponent':
          return <TextComponent {...{ key, data }} />;
        case 'ListComponent':
          return <List {...{ key, data }} />;
        default:
        case 'ImageComponent':
          return <ImageComponent {...{ key, data }} />;
      }
    })}
  </div>
);

Component.propTypes = {
  component: React.PropTypes.object
};

export default Component;
