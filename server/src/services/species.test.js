const { SpeciesService } = require('./species');

const mockSpecies = [
  { id: 1, name: 'Human' },
  { id: 2, name: 'Animal' },
];
jest.mock('../repositories/species', () => ({
  SpeciesRepository: {
    getSpecies: jest.fn(() => mockSpecies),
  },
}));
describe('getSpecies', function () {
  it('should return species array', function () {
    const species = SpeciesService.getSpecies();
    expect(species).toBe(mockSpecies);
  });
});
