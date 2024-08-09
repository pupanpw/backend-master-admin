import { dateToString, searchCondition } from './common.helper';

const mockQueryBuilder = {
  where: jest.fn(),
  andWhere: jest.fn(),
  orWhere: jest.fn(),
  orderBy: jest.fn(),
  take: jest.fn(),
  skip: jest.fn(),
  addOrderBy: jest.fn(),
  getManyAndCount: jest.fn().mockResolvedValue([]),
} as any;

describe('CommonHelper', () => {
  describe('dateToString', () => {
    it('should be return correctly data', () => {
      const dateString = '2022-02-28';
      const result = dateToString(new Date(dateString));

      expect(result).toEqual(dateString);
    });

    describe('searchCondition', () => {
      it('should generate correct SQL query for a single field', () => {
        const fields = ['name'];
        const search = 'test';

        const conditionFn = searchCondition(fields, search);
        conditionFn(mockQueryBuilder);

        expect(mockQueryBuilder.orWhere).toHaveBeenCalledWith(
          'LOWER(name) LIKE :search',
          {
            search: '%test%',
          },
        );
      });

      it('should generate correct SQL query for multiple fields', () => {
        const fields = ['id', 'name'];
        const search = 'test';

        const conditionFn = searchCondition(fields, search);
        conditionFn(mockQueryBuilder);

        expect(mockQueryBuilder.orWhere).toHaveBeenCalledWith(
          'LOWER(name) LIKE :search',
          {
            search: '%test%',
          },
        );
        expect(mockQueryBuilder.orWhere).toHaveBeenCalledWith(
          'LOWER(id) LIKE :search',
          {
            search: '%test%',
          },
        );
      });
    });
  });
});
