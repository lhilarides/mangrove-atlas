import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import LegendItem from './legend-item';

import styles from './style.module.scss';

const Legend = ({ layers, isCollapsed }) => (
  <Fragment>
    {isCollapsed ? (
      <Fragment>
        <div className={classnames(styles.layersCollapse, styles.title,
          { [styles.collapse]: isCollapsed })}
        >
          <span>Layers</span>
        </div>
        <button
          type="button"
          className={styles.layersBtn}
          // onClick={onToggleCollapsed}
        >
          {/* {isCollapsed
            ? <FontAwesomeIcon icon={faChevronDown} />
            : <FontAwesomeIcon icon={faChevronUp} />
          } */}
        </button>
      </Fragment>
    )
      : layers.map(layer => <LegendItem key={layer.id} {...layer} />)}
  </Fragment>
);


Legend.propTypes = {
  layers: PropTypes.arrayOf(PropTypes.shape({}))
};

Legend.defaultProps = {
  layers: []
};

export default Legend;
