import { getCloudSelectedWordInfoById } from '../../utils';

const { describe, it, expect } = global;

const wordList = [
  {
    id: 'jest test - utils.getCloudSelectedWordInfoById - id 1',
    label: 'jest test - utils.getCloudSelectedWordInfoById - label 1',
    volume: 12,
    sentiment: {},
    pageType: {},
  }, {
    id: 'jest test - utils.getCloudSelectedWordInfoById - id 2',
    label: 'jest test - utils.getCloudSelectedWordInfoById - label 2',
    volume: 22,
    sentiment: {},
    pageType: {},
  }, {
    id: 'jest test - utils.getCloudSelectedWordInfoById - id 3',
    label: 'jest test - utils.getCloudSelectedWordInfoById - label 3',
    volume: 32,
    sentiment: {},
    pageType: {},
  },
];
describe('utils | getCloudSelectedWordInfoById', () => {
  it('should return the word corresponding to the input id', () => {
    expect(getCloudSelectedWordInfoById(
      wordList,
      'jest test - utils.getCloudSelectedWordInfoById - id 2',
    )).toEqual({
      label: 'jest test - utils.getCloudSelectedWordInfoById - label 2',
      volume: 22,
      sentiment: {},
      pageType: {},
    });
  });

  it('should return null', () => {
    expect(getCloudSelectedWordInfoById(
      wordList,
      'jest test - utils.getCloudSelectedWordInfoById - id 4',
    )).toEqual(null);
  });
});
