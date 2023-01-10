const mockCharacter = { id: 1 };
const mockSet = { id: 1, name: 'Rick and Morty set', characters: [mockCharacter] };
const mockSet2 = { id: 2, name: 'Ricks set', characters: [] };
const mockSets = [mockSet, mockSet2];
const mockSetsFromDB = {
  results: mockSets,
  total: mockSets.length,
};

module.exports.SetsRepository = {
  getSets: jest.fn(() => mockSetsFromDB),
  getSet: jest.fn((columnName, value) => mockSets.find((set) => set[columnName] === value)),
  getSetsInfo: jest.fn(() => mockSetsFromDB),
  createSet: jest.fn((name) => ({ id: 2, name })),
  deleteSet: jest.fn((id) => (mockSets.find((set) => set.id === id) ? 1 : 0)),
  removeCharacterFromSet: jest.fn((set, character) => ({
    ...set,
    characters: set.characters.filter((char) => char.id !== character.id),
  })),
  addCharacterToSet: jest.fn((set, character) => ({
    ...set,
    characters: [...set.characters, character],
  })),
  getAllSets: jest.fn(() => mockSets),
  mockData: {
    mockCharacter,
    mockSet,
    mockSet2,
    mockSets,
    mockSetsFromDB,
  },
};
