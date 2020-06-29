import React from 'react';
import groupBy from 'lodash/groupBy';
import WidgetTooltip from 'components/widget-tooltip';
import WidgetLegend from 'components/widget-legend';

import { format } from 'd3-format';

const numberFormat = format(',.2f');

const widgetData = ({ list, metadata }) => {
  if (list && list.length) {
    const { location_coast_length_m: total } = metadata;

    return list.filter(d => d.length_m).map((d) => {
      const year = new Date(d.date).getFullYear();

      return ({
        x: Number(year),
        y: d.length_m + 60,
        color: '#00857F',
        percentage: d.length_m / total * 100 + 50,
        unit: '%',
        coverage: (d.length_m).toFixed(2),
        value: (d.length_m + 60).toFixed(2),
        name: 'Tree biomass'
      });
    });
  }

  return [];
};


const widgetMeta = ({ list, metadata }) => {
  if (list && list.length && metadata) {
    return {
      years: Array.from(
        new Set(
          list.filter(d => d.length_m).map(d => new Date(d.date).getFullYear())
        )
      ),
      total: metadata.location_coast_length_m
    };
  }

  return {
    years: [],
    total: null
  };
};

export const CONFIG = {
  parse: data => ({
    chartData: widgetData(data),
    metadata: widgetMeta(data),
    chartConfig: {
      type: 'pie',
      layout: 'centric',
      height: 250,
      margin: { top: 20, right: 0, left: 0, bottom: 0 },
      xKey: 'percentage',
      yKeys: {
        pies: {
          coverage: {
            cx: '50%',
            cy: '50%',
            paddingAngle: 3,
            dataKey: 'percentage',
            nameKey: 'label',
            innerRadius: '60%',
            outerRadius: '80%',
            isAnimationActive: false,
            customLabel: ({ viewBox }) => {
              const { cx, cy } = viewBox;
              return (
                <g>
                  <text x={cx} y={cy - 30} lineHeight="19" className="recharts-text recharts-label" textAnchor="middle" dominantBaseline="central">
                    <tspan alignmentBaseline="middle" fill="rgba(0,0,0,0.85)" fontSize="14">Total</tspan>
                  </text>
                  <text x={cx} y={cy} className="recharts-text recharts-label" textAnchor="middle" dominantBaseline="central">
                    <tspan alignmentBaseline="middle" fill="rgba(0,0,0,0.85)" lineHeight="29" fontSize="40">355</tspan>
                  </text>
                  <text x={cx} y={cy + 30} className="recharts-text recharts-label" textAnchor="middle" dominantBaseline="central">
                    <tspan alignmentBaseline="middle" fill="rgba(0,0,0,0.85)" fontSize="14">tCO2e</tspan>
                  </text>
                </g>
              );
            }
          },
        }
      },
      legend: {
        align: 'left',
        verticalAlign: 'middle',
        layout: 'vertical',
        content: (properties) => {
          const { payload } = properties;
          const groups = groupBy(payload.map(item => ({
            ...item,
            payload: {
              ...item.payload,
              y: (item.payload.y / 1000).toFixed(2)
            }
          })), p => p.payload.name);
          return <WidgetLegend groups={groups} unit="%" />;
        }
      },
      tooltip: {
        cursor: false,
        content: (
          <WidgetTooltip
            style={{

              flexDirection: 'column',
              justifyContent: 'space-around',
              marginLeft: '10px',
            }}
            settings={[
              { key: 'label' },
              { label: 'Tree biomass:', key: 'percentage', format: percentage => `${percentage ? percentage.toFixed(2) : null} %`, position: '_column' },
              { label: 'Soil:', key: 'coverage', format: coverage => `${(numberFormat(coverage))} km`, position: '_column' }
            ]}
          />
        )
      }
    }
  })
};

export default CONFIG;