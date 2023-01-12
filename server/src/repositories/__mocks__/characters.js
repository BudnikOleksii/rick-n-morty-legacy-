const mockCharacter = { id: 1 };
const mockCharacter2 = { id: 2 };
const mockCharacters = [mockCharacter, mockCharacter2];
const mockCharactersFromDB = {
  results: mockCharacters,
  total: mockCharacters.length,
};

module.exports.CharactersRepository = {
  getCharacterById: jest.fn((id) => mockCharacters.find((character) => character.id === id)),
  mockData: {
    mockCharacters,
  },
};
