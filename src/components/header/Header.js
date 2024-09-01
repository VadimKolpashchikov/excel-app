import { defaultTitle } from '@const/title';
import { ExcelComponent } from '@core/ExcelComponent';
import { actions } from '@store';

/* eslint-disable import/prefer-default-export */
export class Header extends ExcelComponent {
  static $className = 'excel-header';

  $titleInputId = 'table-title-input';

  constructor(root, options = {}) {
    super(root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
  }

  init() {
    super.init();
    this.$titleInput = this.$root.find(`#${this.$titleInputId}`);
  }

  onInput() {
    if (this.$titleInput) {
      const title = this.$titleInput.text();
      this.$dispatch(actions.changeTitle({ title }));
    }
  }

  get template() {
    const initValue = this.$store.getState('title') || defaultTitle;

    return /* html */`
    <input
      type="text"
      class="input excel-header__input"
      placeholder="Новая таблица"
      id="${this.$titleInputId}"
      value="${initValue}"
    />
    <div class="excel-header__buttons">
      <button class="btn" type="button">
        <i class="material-symbols-outlined"> delete </i>
      </button>
      <button class="btn" type="button">
        <i class="material-symbols-outlined"> logout </i>
      </button>
    </div>
  `;
  }
}
