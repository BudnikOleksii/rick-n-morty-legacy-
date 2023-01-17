const { createInfoData } = require('./create-info-data');
const { limit } = require('../services/__mocks__/mock-data');

describe('createInfoData', function () {
  it('should return object with correct next and prev page', function () {
    const testTotal = 100;
    const testPage = 4;
    const endpoint = 'localhost:8080/v1/';
    const nextQueryParams = `page=${testPage + 1}&limit=${limit}`;
    const prevQueryParams = `page=${testPage - 1}&limit=${limit}`;
    const { total, next, prev, pages } = createInfoData(testTotal, testPage, limit, endpoint);

    expect(total).toBe(testTotal);
    expect(next.split('?')[1]).toBe(nextQueryParams);
    expect(prev.split('?')[1]).toBe(prevQueryParams);
    expect(pages).toBe(Math.ceil(total / limit));
  });
});
