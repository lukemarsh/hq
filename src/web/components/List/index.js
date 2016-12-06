import React from 'react';
import styles from './styles.css';

export const List = ({ data }) => (
  <div>
    <h3>Files & Links</h3>
    {data.links.map((link, key) =>
      <div
        className={styles.item} {...{ key }}
      >{link.title}</div>)}
  </div>
);

List.propTypes = {
  data: React.PropTypes.object
};


export default List;
