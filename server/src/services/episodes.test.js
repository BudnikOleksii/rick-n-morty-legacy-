const { BadRequestError } = require('../utils/errors/api-errors');
const { mockData } = require('../repositories/__mocks__/episodes').EpisodesRepository;
const { page, limit, incorrectLimit } = require('./__mocks__/mock-data');
const { EpisodesService } = require('./episodes');
const { EpisodesRepository } = require('../repositories/episodes');

const { mockEpisodes } = mockData;
const endpoint = 'localhost:8080/v1/episodes';

jest.mock('../repositories/episodes');

describe('getEpisodes', function () {
  it('should not call EpisodesRepository.getEpisodes if limit incorrect and throw BadRequestError', async function () {
    expect.assertions(2);
    await expect(EpisodesService.getEpisodes(page, incorrectLimit, endpoint)).rejects.toThrow(
      BadRequestError
    );
    expect(EpisodesRepository.getEpisodes).toHaveBeenCalledTimes(0);
  });

  it('should return correct info object and an array of episodes', async function () {
    const { info, results } = await EpisodesService.getEpisodes(page, limit, endpoint);

    expect(info.total).toBe(mockEpisodes.length);
    expect(info.next).toBeNull();
    expect(info.prev).toBeNull();
    expect(info.pages).toBe(1);
    expect(results).toStrictEqual(mockEpisodes);
  });
});
