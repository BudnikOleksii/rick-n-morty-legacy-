const mockEpisode = { id: 1, name: 'Rick' };
const mockEpisode2 = { id: 2, name: 'Morty' };
const mockEpisodes = [mockEpisode, mockEpisode2];

module.exports.EpisodesRepository = {
  getEpisodes: jest.fn(() => ({
    results: mockEpisodes,
    total: mockEpisodes.length,
  })),
  mockData: {
    mockEpisodes,
  },
};
