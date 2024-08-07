import { ExcelComponent } from '@core/ExcelComponent';

/* eslint-disable import/prefer-default-export */
export class Formula extends ExcelComponent {
  static $className = 'excel-formula';

  constructor(root, options = {}) {
    super(root, {
      name: 'Formula',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  onInput(event) {
    this.$emit('formulaInput', event.target.textContent);
  }

  onClick(event) {
    if (event) {
      return this;
    }
    return this;
  }

  $html = /* html */`
    <div class="excel-formula__info">fx</div>
    <div class="excel-formula__input" contenteditable spellcheck="false"></div>
  `;
}
