const LAYERS = [
  {
    id: 'net_change',
    type: 'vector',

    source: {
      type: 'vector',
      url: 'mapbox://mangrove-atlas.gmw_change_1996_2016'
    },
    render: {
      layers: [
        {
          type: 'fill',
          source: 'net_change',
          'source-layer': 'gmw_change_1996_2016',
          paint: {
            'fill-color': [
              'match',
              [
                'get',
                'change_type'
              ],
              [
                'gain'
              ],
              '#a6cb10',
              [
                'loss'
              ],
              '#eb6442',
              '#000000'
            ]
          }
        }
      ]
    }
  },
  {
    id: 'cons_hotspots',
    type: 'vector',

    source: {
      type: 'vector',
      url: 'mapbox://mangrove-atlas.cons_hotspots'
    },
    render: {
      layers: [
        {
          type: 'fill',
          source: 'cons_hotspots',
          'source-layer': 'cons_hotspots',
          paint: {
            'fill-color': [
              'match',
              [
                'get',
                'ST_Advice'
              ],
              [
                'Requires Monitoring'
              ],
              '#fcbf6e',
              [
                'Monitoring Advised'
              ],
              '#1a99cb',
              [
                'Benefits from'
              ],
              '#87cee8',
              [
                'Requires Conservation'
              ],
              '#ed896e',
              '#0c3b6d'
            ]
          }
        }
      ]
    }
  },
  {
    id: 'WDPA_polygons',
    type: 'vector',

    source: {
      type: 'vector',
      url: 'mapbox://mangrove-atlas.selected_WDPA_polygons'
    },
    render: {
      layers: [
        {
          type: 'line',
          source: 'selected_WDPA_polygons',
          'source-layer': 'selected_WDPA_polygons',
          paint: {
            'line-color': '#146aff',
            'line-opacity': 0.4,
          }
        },
        {
          type: 'fill',
          source: 'selected_WDPA_polygons',
          'source-layer': 'selected_WDPA_polygons',
          paint: {
            'fill-color': '#286ce2',
            'fill-opacity': 0.04,
            'fill-outline-color': '#000000',
          }
        }
      ]
    }
  },
  {
    id: 'EEZ_land',
    type: 'vector',
    source: {
      type: 'vector',
      url: 'mapbox://mangrove-atlas.selected_EEZ_land_v2_201410'
    },
    render: {
      layers: [
        {
          type: 'line',
          source: 'selected_EEZ_land_v2_201410',
          'source-layer': 'selected_EEZ_land_v2_201410',
          paint: {
            'line-color': '#1d6764',
          }
        }
      ]
    }
  }
];

export default LAYERS;

// 'composite': {
//   "url": "mapbox://mangrove-atlas.gmw_1996_2016,",
//   "type": "vector"
// }
