/**
 * @jest-environment jsdom
*/

import { MockDachboardPage, content } from './mocks/DachboardPage';
import { MockExcelPage, content as excelContent } from './mocks/ExcelPage';
import { Router } from './Router';
import { activeRoute } from './ActiveRoute';

describe('Router:', () => {
  let router;
  let root;

  beforeEach(() => {
    root = document.createElement('div');
    router = new Router(
      root,
      {
        dashboard: MockDachboardPage,
        excel: MockExcelPage,
      },
    );
  });

  test('should be defined', () => {
    expect(router).toBeDefined();
  });

  test('should be displayed dashboard page by default', () => {
    expect(root.innerHTML).toBe(`<div>${content}</div>`);
  });

  test('should change page when hash changes', () => new Promise((resolve) => {
    activeRoute.navigate('excel');

    setTimeout(() => {
      expect(root.innerHTML).toBe(`<div>${excelContent}</div>`);
      resolve();
    }, 1);
  }));
});
