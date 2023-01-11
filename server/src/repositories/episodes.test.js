const Episode = require('../models/__mocks__/episodes');
const { EpisodesRepository } = require('./episodes');

jest.mock('../models/episodes');
describe('getEpisodes', function () {
  it('should return results and total episodes count', function () {
    const { results, total } = EpisodesRepository.getEpisodes(1, 20);
    expect(results).toStrictEqual(Episode.mockData);
    expect(total).toBe(Episode.mockData.length);
  });
});
