import { Page } from '../../core/page/Page';

export const content = 'MockExcelPage';

export class MockExcelPage extends Page {
  getRoot() {
    this.$root = document.createElement('div');
    this.$root.innerHTML = content;

    return this.$root;
  }
}
