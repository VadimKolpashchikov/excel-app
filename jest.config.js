module.exports = {
  roots: ['<rootDir>'],
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@const/(.*)$': '<rootDir>/src/const/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
