const mockCharacter = { id: 1, unused: true };
const mockCharacter2 = { id: 2, unused: true };
const mockCharacters = [mockCharacter, mockCharacter2];
const mockUnusedCount = mockCharacters.filter((character) => character.unused).length;
const mockCharactersFromDB = {
  results: mockCharacters,
  total: mockCharacters.length,
};

const getCharacterById = jest.fn((id) => mockCharacters.find((character) => character.id === id));

module.exports.CharactersRepository = {
  getCharacters: jest.fn(() => mockCharactersFromDB),
  getCharacterById,
  countUnused: jest.fn(() => mockUnusedCount),
  markCharacterAsUsed: jest.fn((id) => {
    const character = getCharacterById(id);

    return { ...character, unused: false };
  }),
  mockData: {
    mockCharacter,
    mockCharacters,
    mockUnusedCount,
  },
};
