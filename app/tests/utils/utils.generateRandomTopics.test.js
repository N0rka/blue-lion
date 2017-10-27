import { generateRandomTopics } from '../../utils';

const { describe, it, expect } = global;

const defaultLabels = [
  'Poland',
  'United Kingdom',
  'Spain',
  'Switzerland',
  'Australia',
  'Ireland',
  'Canada',
  'France',
  'Finland',
  'Algeria',
  'Italy',
  'Sweden',
  'Brazil',
  'Argentina',
  'Japan',
  'Peru',
  'Nepal',
  'Thailand',
  'Estonia',
  'Belgium',
];
const randomLabels = [
  'Poland',
  'Norway',
  'Spain',
  'Belgium',
  'Jamaica',
  'Kenya',
  'New Zealand',
  'Croatia',
  'United Kingdom',
  'Dominican Republic',
  'Taiwan',
  'Denmark',
  'Liechtenstein',
  'Peru',
  'Mexico',
  'Fiji',
  'Monaco',
  'China',
  'Switzerland',
  'Venezuela',
  'India',
  'Australia',
  'United Arab Emirates',
  'Thailand',
  'Estonia',
  'Ireland',
  'Portugal',
  'Nepal',
  'Turkey',
  'United States',
  'Cameroon',
  'Canada',
  'Ethiopia',
  'East Timor',
  'Namibia',
  'Mozambique',
  'Greece',
  'South Africa',
  'Antarctica',
  'France',
  'Viet Nam',
  'Finland',
  'Maldives',
  'Romania',
  'Algeria',
  'Lithuania',
  'South Korea',
  'Italy',
  'Slovenia',
  'Philippines',
  'Luxembourg',
  'New Caledonia',
  'Malaysia',
  'Czech Republic',
  'Guinea',
  'Iceland',
  'Sweden',
  'Brazil',
  'Panama',
  'Argentina',
  'Niger',
  'Japan',
  'Latvia',
  'Botswana',
  'Indonesia',
  'Bulgaria',
];

describe('utils | generateRandomTopics', () => {
  const defaultTopics = generateRandomTopics('default', defaultLabels);
  const randomTopics = generateRandomTopics('random', randomLabels);
  it('checks if 3 topics picked in the generated default array has the right properties', () => {
    expect(defaultTopics[0]).toHaveProperty('id');
    expect(defaultTopics[0]).toHaveProperty('label');
    expect(defaultTopics[0]).toHaveProperty('volume');
    expect(defaultTopics[0]).toHaveProperty('sentiment');
    expect(defaultTopics[0]).toHaveProperty('sentimentScore');
    expect(defaultTopics[0]).toHaveProperty('pageType');
    expect(defaultTopics[5]).toHaveProperty('id');
    expect(defaultTopics[5]).toHaveProperty('label');
    expect(defaultTopics[5]).toHaveProperty('volume');
    expect(defaultTopics[5]).toHaveProperty('sentiment');
    expect(defaultTopics[5]).toHaveProperty('sentimentScore');
    expect(defaultTopics[5]).toHaveProperty('pageType');
    expect(defaultTopics[15]).toHaveProperty('id');
    expect(defaultTopics[15]).toHaveProperty('label');
    expect(defaultTopics[15]).toHaveProperty('volume');
    expect(defaultTopics[15]).toHaveProperty('sentiment');
    expect(defaultTopics[15]).toHaveProperty('sentimentScore');
    expect(defaultTopics[15]).toHaveProperty('pageType');
  });
  it('checks if 3 topics picked in the generated random array has the right properties', () => {
    expect(randomTopics[0]).toHaveProperty('id');
    expect(randomTopics[0]).toHaveProperty('label');
    expect(randomTopics[0]).toHaveProperty('volume');
    expect(randomTopics[0]).toHaveProperty('sentiment');
    expect(randomTopics[0]).toHaveProperty('sentimentScore');
    expect(randomTopics[0]).toHaveProperty('pageType');
    expect(randomTopics[5]).toHaveProperty('id');
    expect(randomTopics[5]).toHaveProperty('label');
    expect(randomTopics[5]).toHaveProperty('volume');
    expect(randomTopics[5]).toHaveProperty('sentiment');
    expect(randomTopics[5]).toHaveProperty('sentimentScore');
    expect(randomTopics[5]).toHaveProperty('pageType');
    expect(randomTopics[14]).toHaveProperty('id');
    expect(randomTopics[14]).toHaveProperty('label');
    expect(randomTopics[14]).toHaveProperty('volume');
    expect(randomTopics[14]).toHaveProperty('sentiment');
    expect(randomTopics[14]).toHaveProperty('sentimentScore');
    expect(randomTopics[14]).toHaveProperty('pageType');
  });
  it('checks the size of the generated default array', () => {
    expect(defaultTopics.length).toBe(20);
  });
  it('checks the size of the generated random array', () => {
    expect(randomTopics.length).toBeGreaterThanOrEqual(15);
    expect(randomTopics.length).toBeLessThanOrEqual(20);
  });
});
