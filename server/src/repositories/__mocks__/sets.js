const mockCharacter = { id: 1 };
const mockSet = { id: 1, name: 'Rick and Morty set', characters: [mockCharacter] };
const mockSets = [mockSet];
const mockSetsFromDB = {
  results: mockSets,
  total: mockSets.length,
};

module.exports.SetsRepository = {
  getSets: jest.fn(() => mockSetsFromDB),
  getSet: jest.fn((columnName, value) => mockSets.find((set) => set[columnName] === value)),
  mockData: {
    mockSet,
    mockSets,
    mockSetsFromDB,
  },
};
