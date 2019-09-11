import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './style.module.scss';

class Tooltip extends PureComponent {
  static propTypes = {
    payload: PropTypes.arrayOf(PropTypes.shape({})),
    settings: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    style: PropTypes.shape({}),
    hideZeros: PropTypes.bool
  };

  static defaultProps = {
    payload: [],
    style: {},
    hideZeros: false
  }

  getValue = (item, value) => {
    const { format, suffix = '', preffix = '' } = item;
    let val = value;

    if (format && typeof format === 'function') {
      val = format(val);
    }

    return `${preffix}${val}${suffix}`;
  }

  render() {
    const { payload, settings, style, hideZeros } = this.props;
    const values = payload && payload.length > 0 && payload[0].payload;

    return (
      <div>
        {settings && settings.length && (
          <div className={styles.chart_tooltip} style={style}>
            {settings.map(
              d => (hideZeros && values[d.key] ? null : (
                <div
                  key={d.key}
                  className={classNames(styles.data_line, {
                    [d.position]: !!d.position
                  })
                }
                >
                  {/* LABEL */}
                  {(d.label || d.labelKey) && (
                    <div className={styles.data_label}>
                      {d.color && (
                        <div
                          className={styles.data_color}
                          style={{ backgroundColor: d.color }}
                        />
                      )}

                      {d.key === 'break' ? (
                        <span className={styles.break_label}>{d.label}</span>
                      ) : (
                        <span>{d.label || values[d.labelKey]}</span>
                      )}
                    </div>
                  )}

                  {/* UNIT */}
                  <div
                    className={styles.data_value}
    //                style={{ color: (payload.length && d.key === 'label') ? payload[0].payload.color : ' ' }}
                  >
                    {this.getValue(d, values[d.key])}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Tooltip;
