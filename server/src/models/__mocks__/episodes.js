const MockBaseModel = require('./base-model');
const mockEpisode = { id: 1 };
const mockEpisode2 = { id: 2 };

class Episode extends MockBaseModel {}

Episode.mockData = [mockEpisode, mockEpisode2];
Episode.mockResults = [mockEpisode, mockEpisode2];

module.exports = Episode;
