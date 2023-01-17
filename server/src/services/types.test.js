const { TypesService } = require('./types');

const mockTypes = [
  { id: 1, name: 'Human' },
  { id: 2, name: 'Animal' },
];
jest.mock('../repositories/types', () => ({
  TypesRepository: {
    getTypes: jest.fn(() => mockTypes),
  },
}));
describe('getTypes', function () {
  it('should return species array', function () {
    const types = TypesService.getTypes();
    expect(types).toBe(mockTypes);
  });
});
