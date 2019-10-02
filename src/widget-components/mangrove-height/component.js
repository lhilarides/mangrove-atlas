import React, { useState } from 'react';
import Select from 'components/select';
import ChartWidget from 'components/chart-widget';

import config from './config';

const MangroveHeight = ({ data: rawData, isCollapsed, slug, name, currentLocation, ...props }) => {
  const [startDate, setStartDate] = useState('1996');
  const [endDate, setEndDate] = useState('2010');
  const [area, setAreaType] = useState('canopy');
  if (!rawData) {
    return null;
  }

  const { chartData, metadata, chartConfig, heightData } = config.parse(rawData);

  if (!chartData) return null;

  const location = currentLocation.name;
  const areaOptions = [
    //{ label: 'basal', value: 'basal' }, *TO-DO add opton when data is ready
    { label: 'canopy', value: 'canopy'}
  ];

  const dateOptions = metadata.map(year => ({
    label: year.toString(),
    value: year.toString()
  }));

  const areaSelector = (
    <Select
      value={area}
      options={areaOptions}
      onChange={value => setAreaType(value)}
    />
  );

  const startDateSelector = (
    <Select
      value={startDate}
      options={dateOptions}
      isOptionDisabled={option => parseInt(option.value, 10) > parseInt(endDate, 10) ||
        option.value === startDate}
      onChange={value => setStartDate(value)}
    />
  );

  const endDateSelector = (
    <Select
      value={endDate}
      options={dateOptions}
      isOptionDisabled={option => parseInt(option.value, 10) < parseInt(startDate, 10) ||
        option.value === endDate}
      onChange={value => setEndDate(value)}
    />
  );

  const sentence = (
    <>
      Mean mangrove {areaSelector} height (m) in <strong>{location}</strong> was <strong>average({heightData.height})</strong> between {startDateSelector} and {endDateSelector}.
    </>
  );
  const chartRData = {
    data: chartData,
    config: chartConfig
  };

  return (
    <ChartWidget
      name={name}
      data={chartData}
      slug={slug}
      filename={slug}
      isCollapsed={isCollapsed}
      sentence={sentence}
      chartData={chartRData}
      {...props}
    />
  );
};

export default MangroveHeight;
