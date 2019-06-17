import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/button';
import styles from './style.module.css';

const Widget = ({
  id,
  title,
  slug,
  isCollapsed,
  children,
  onMapAction,
  onCollapseToggle,
  widgetConfig,
  ...props
}) => {
  const mapActionHandler = () => {
    onMapAction({ id });
  };

  const collapseToggleHandler = () => {
    onCollapseToggle({ id, isCollapsed: !isCollapsed });
  };

  // TODO: Fetch widget data and pass to parse
  // For now, fake mangroves coverate
  let widgetData;
  if (slug === 'mangrove_coverage') {
    widgetData = widgetConfig.parse({ rows: [1, 2] });
  } else {
    widgetData = widgetConfig.parse({ rows: [] });
  }

  return (
    <div className={styles.widget_wrapper}>
      <div className={styles.widget_header}>
        <button
          type="button"
          className={styles.widget_title}
          onClick={collapseToggleHandler}
        >
          {title}
        </button>
        <Button onClick={mapActionHandler}>Show layer</Button>
      </div>
      <div className="widget--content">
        {children({
          id,
          title,
          slug,
          isCollapsed,
          data: widgetData,
          ...props
        })}
      </div>
    </div>
  );

  // return (
  //   <div className={styles.widget_wrapper}>
  //     <div className={styles.widget_header}>
  //       <button
  //         type="button"
  //         className={styles.widget_title}
  //         onClick={collapseToggleHandler}
  //       >
  //         {title}
  //       </button>
  //       <Button onClick={mapActionHandler}>Show layer</Button>
  //     </div>
  //     <div className={classnames('widget--body', { '-collapsed': isCollapsed })}>
  //       <Chart />
  //     </div>
  //   </div>
  // );
};

Widget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  widgetConfig: PropTypes.shape({}).isRequired,
  isCollapsed: PropTypes.bool,
  children: PropTypes.func.isRequired,
  onMapAction: PropTypes.func,
  onCollapseToggle: PropTypes.func
};

Widget.defaultProps = {
  isCollapsed: false,
  onMapAction: () => {},
  onCollapseToggle: () => {}
};

export default Widget;
