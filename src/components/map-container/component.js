import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import { breakpoints } from 'utils/responsive';
import { NavigationControl, FullscreenControl } from 'react-map-gl';
import classnames from 'classnames';
import pick from 'lodash/pick';
import Bowser from 'bowser';

// Components
import MobileLegendControl from 'components/map-legend/mobile';
import MangroveMap from 'components/map';
import BasemapSelector from 'components/basemap-selector';
import Legend from 'components/map-legend';

import styles from './style.module.scss';

export const MapContainer = ({
  viewport,
  setViewport,
  isCollapse,
  mapboxApiAccessToken,
  mapStyle,
  bounds,
  goToCountry,
  goToAOI
}) => {
  const onViewportChange = (newViewport) => {
    setViewport(pick(newViewport, ['latitude', 'longitude', 'zoom', 'bearing', 'pitch']))
  };

  const resize = () => {
    onViewportChange({
      ...viewport,
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  useEffect(() => {
    window.addEventListener('resize', resize);
    resize();
    return function cleanup() {
      window.removeEventListener('resize', resize);
    }
  }, []);

  const { parsedResult: browser } = (Bowser.getParser(window.navigator.userAgent));

  /**
   * CHANGING CURSOR FOR INTERACTIVE LAYERS
   * For changing the cursor of interactive layers you need to add
   * interactive layer ids to this array and pass it as a property.
   * It is part of react-map-gl and is documented here:
   * https://uber.github.io/react-map-gl/#/Documentation/api-reference/interactive-map?section=interaction-options
   * You can provide a custom getCursor function that will overwrite
   * the one used by default, documentation is on the same page.
  */
  const interactiveLayerIds = ['selected-eez-land-v2-201410', 'selected-wdpa-polygons'];

  const clickHandler = ({ event }) => {
    const { features } = event;
    const country = features.find(feat => feat.layer.id === 'selected-eez-land-v2-201410');
    const wdpa = features.find(feat => feat.layer.id === 'selected-wdpa-polygons');

    if (wdpa) {
      // todo: this should be done at api level
      // unify AOI ids
      // Use NAME instead of WDPA_PID because there can be different areas with the same name
      const { properties: { NAME: areaName } } = wdpa;
      const internalIdMap = new Map([
        ['Delta du Saloum', '2'],
        ['Rufiji-Mafia-Kilwa', '1'],
        ['Mafia Island', '1']
      ]);

      const internalId = internalIdMap.get(areaName);

      if (internalId) {
        goToAOI({ id: internalId });
      }
    } else if (country) {
      const { properties: { ISO_3digit: countryId } } = country;
      goToCountry({ iso: countryId });
    }
  };
  return (
    <div className={styles.map}>
      <MangroveMap
        viewport={viewport}
        bounds={bounds}
        mapStyle={mapStyle}
        mapboxApiAccessToken={mapboxApiAccessToken}
        onViewportChange={onViewportChange}
        onClick={clickHandler}
        interactiveLayerIds={interactiveLayerIds}
      >
        {() => (
          <div className={styles.navigation}>
            {browser.name !== 'Safari' && (
              <MediaQuery minWidth={breakpoints.lg + 1}>
                <FullscreenControl className={styles.fullscreen} />
              </MediaQuery>
            )}
            <MediaQuery minWidth={breakpoints.sm}>
              <NavigationControl className={styles.zoomControls} />
            </MediaQuery>
          </div>
        )
        }
      </MangroveMap>

      <div className={classnames(styles.legend,
        { [styles.expanded]: !isCollapse })}
      >
        <MediaQuery maxWidth={breakpoints.sm - 1}>
          <MobileLegendControl />
        </MediaQuery>
        <div className={styles.tooltip}>
          <Legend />
          <BasemapSelector />
        </div>
      </div>
    </div>
  );
}

MapContainer.propTypes = {
  viewport: PropTypes.shape({}),
  setViewport: PropTypes.func,
  isCollapse: PropTypes.bool.isRequired,
  mapboxApiAccessToken: PropTypes.string.isRequired,
  mapStyle: PropTypes.shape({}).isRequired,
  bounds: PropTypes.shape({}).isRequired,
  goToCountry: PropTypes.func,
  goToAOI: PropTypes.func
}

MapContainer.defaultProps = {
  viewport: {
    width: window.innerWidth,
    height: window.innerHeight,
    longitude: 0,
    latitude: 0,
    zoom: 2,
    maxZoom: 16,
    bearing: 0,
    pitch: 0
  },
  setViewport: () => { },
  goToCountry: () => { },
  goToAOI: () => { }
}

export default MapContainer;
