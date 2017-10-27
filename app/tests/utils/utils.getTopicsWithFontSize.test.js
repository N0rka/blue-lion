import { getTopicsWithFontSize } from '../../utils';

const { describe, it, expect } = global;

const fontSizes = [12, 16, 22, 30, 40, 52];
const topics = [
  {
    id: 'jest test - utils.getTopicsWithFontSize - id 1',
    label: 'jest test - utils.getTopicsWithFontSize - label 1',
    volume: 78,
  }, {
    id: 'jest test - utils.getTopicsWithFontSize - id 2',
    label: 'jest test - utils.getTopicsWithFontSize - label 2',
    volume: 156,
  }, {
    id: 'jest test - utils.getTopicsWithFontSize - id 3',
    label: 'jest test - utils.getTopicsWithFontSize - label 3',
    volume: 5,
  },
];
const enrichedTopics = [
  {
    id: 'jest test - utils.getTopicsWithFontSize - id 1',
    label: 'jest test - utils.getTopicsWithFontSize - label 1',
    volume: 78,
    fontSize: 22,
  }, {
    id: 'jest test - utils.getTopicsWithFontSize - id 2',
    label: 'jest test - utils.getTopicsWithFontSize - label 2',
    volume: 156,
    fontSize: 52,
  }, {
    id: 'jest test - utils.getTopicsWithFontSize - id 3',
    label: 'jest test - utils.getTopicsWithFontSize - label 3',
    volume: 5,
    fontSize: 12,
  },
];

describe('utils | getTopicsWithFontSize', () => {
  it('should an array of topics enriched with their font size', () => {
    expect(getTopicsWithFontSize(
      topics,
      fontSizes,
    )).toEqual(enrichedTopics);
  });
});
