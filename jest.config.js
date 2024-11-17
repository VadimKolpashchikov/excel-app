module.exports = {
  roots: ['<rootDir>'],
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@const/(.*)$': '<rootDir>/src/const/$1',
    '^@router/(.*)$': '<rootDir>/src/router/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@storage/(.*)$': '<rootDir>/src/storage/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
