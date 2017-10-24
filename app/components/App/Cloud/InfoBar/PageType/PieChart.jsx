import * as d3 from 'd3'
import PropTypes from 'prop-types';
import React from 'react';

import styles from '../../../../../stylesheets/App/Cloud/InfoBar/PageType.scss';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    }),
  ).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  innerRadius: PropTypes.number.isRequired,
  outerRadius: PropTypes.number.isRequired,
  pieChartPercentage: PropTypes.number.isRequired,
  onPathOver: PropTypes.func.isRequired,
  onPathOut: PropTypes.func.isRequired,
};

const PieChart = (props) => {
  /**
   * Renders the page type information of the selected topic
   * @return {ReactComponent}
   */
  const {
    data,
    width,
    height,
    innerRadius,
    outerRadius,
    pieChartPercentage,
    onPathOver,
    onPathOut
  } = props;

  let pie = d3.pie()
    .value((d) => d.value)
    .sort(null);
  const arcGen = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);


  const calculatePercentage = (currentValue) => {
    const total = data.reduce((prev, curr) => {
      return prev + curr.value;
    }, 0);
    return Math.floor(currentValue / total * 100);
  };
  let percentageDisplay = () => {
    if(pieChartPercentage !== -1){
      return(
        <g transform={`translate(${width/2}, ${height/2})`}>
          <text
            y={ 10 }
            key={'pieChart_percentage'}
            textAnchor="middle"
            className={styles.percentage}
          >
            {pieChartPercentage}%
          </text>
        </g>
      );
    }
    return null;
  };

  return (
    <div>
      <svg width={width } height={height}>
        <g transform={`translate(${width/2}, ${height/2})`}>
          {
            pie(data).map((a, i) => (
              <path
                key={'arc_' + i}
                fill={data[i].color}
                stroke={'white'}
                d={arcGen(a)}
                onMouseOver={() => onPathOver(calculatePercentage(data[i].value))}
                onMouseOut={() => onPathOut()}
              />
            ))
          }
        </g>
        { percentageDisplay() }
      </svg>
    </div>
  );
};

export default PieChart;

PieChart.propTypes = propTypes;
