import * as d3 from 'd3'
import PropTypes from 'prop-types';
import React from 'react';

import styles from '../../../../stylesheets/App/Cloud/InfoBar/PageType.scss';

import PieChart from './PageType/PieChart.jsx';
import Legend from './PageType/Legend.jsx';

const propTypes = {
  pageType: PropTypes.shape({
    blog: PropTypes.number.isRequired,
    facebook: PropTypes.number.isRequired,
    forum: PropTypes.number.isRequired,
    general: PropTypes.number.isRequired,
    image: PropTypes.number.isRequired,
    news: PropTypes.number.isRequired,
    review: PropTypes.number.isRequired,
    twitter: PropTypes.number.isRequired,
    video: PropTypes.number.isRequired,
  }).isRequired,
  pieChartPercentage: PropTypes.number.isRequired,
  onPathOver: PropTypes.func.isRequired,
  onPathOut: PropTypes.func.isRequired,
};

const PageType = (props) => {
  /**
   * Renders the media information of the selected topic
   * @return {ReactComponent}
   */
  const {
    pageType,
    pieChartPercentage,
    onPathOver,
    onPathOut
  } = props;
  const colors = d3.scaleOrdinal(d3.schemeCategory10);
  const data = [
    { label: 'blog', value: pageType.blog, color: colors(0) },
    { label: 'facebook', value: pageType.facebook, color: colors(1) },
    { label: 'forum', value: pageType.forum, color: colors(2) },
    { label: 'general', value: pageType.general, color: colors(3) },
    { label: 'image', value: pageType.image, color: colors(4) },
    { label: 'news', value: pageType.news, color: colors(5) },
    { label: 'review', value: pageType.review, color: colors(6) },
    { label: 'twitter', value: pageType.twitter, color: colors(7) },
    { label: 'video', value: pageType.video, color: colors(8) },
  ];
  const width = 300;
  const height = 300;
  const innerRadius = 60;
  const outerRadius = 120;

  return (
    <div className={styles.container} >
      <PieChart
        data={data}
        width={width}
        height={height}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        pieChartPercentage={pieChartPercentage}
        onPathOver={onPathOver}
        onPathOut={onPathOut}
      />
      <Legend
        data={data}
        width={80}
        height={height}
      />
    </div>
  );
};

export default PageType;

PageType.propTypes = propTypes;
