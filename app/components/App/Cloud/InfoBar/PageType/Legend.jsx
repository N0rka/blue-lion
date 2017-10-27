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
};

const Legend = (props) => {
  /**
   * Renders the media legend
   * @return {ReactComponent}
   */
  const {
    data,
    width,
    height,
  } = props;
  let legendRectSize = 18;
  let legendSpacing = 4;
  let legendTransform = (count) =>
  `translate(0, ${count * (legendRectSize + legendSpacing)- ((legendRectSize + legendSpacing) * data.length / 2)})`;

  return (
    <div>
      <svg width={width / 2} height={height} className={styles.legendRect}>+ legendSpacing
        <g transform={`translate(${[width / 4, height / 2]})`}>
          {data.map((d, i) => (
            <rect
              key={'legendRect_' + i}
              width={legendRectSize}
              height={legendRectSize}
              fill={d.color}
              stroke={'black'}
              transform={legendTransform(i)}
            />
          ))
          }
        </g>
      </svg>
      <svg width={width} height={height}>
        <g transform={`translate(${[width / 2, height / 2]})`}>
          {data.map((d, i) => (
            <text
              y={ legendRectSize - legendSpacing }
              key={'legendText_' + i}
              style={{ backgroundColor: d.color }}
              textAnchor='middle'
              transform={legendTransform(i)}
            >
              {d.label}
            </text>
          ))
          }
        </g>
      </svg>
    </div>
  );
};

export default Legend;

Legend.propTypes = propTypes;
