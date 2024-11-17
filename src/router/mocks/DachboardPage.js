import { Page } from '../../core/page/Page';

export const content = 'MockDachboardPage';

export class MockDachboardPage extends Page {
  getRoot() {
    this.$root = document.createElement('div');
    this.$root.innerHTML = content;

    return this.$root;
  }
}
