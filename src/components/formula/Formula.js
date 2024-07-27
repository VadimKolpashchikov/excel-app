import { ExcelComponent } from '@core/ExcelComponent';

/* eslint-disable import/prefer-default-export */
export class Formula extends ExcelComponent {
  static $className = 'excel-formula';

  constructor(root) {
    super(root, {
      name: 'Formula',
      listeners: ['input', 'click'],
    });
  }

  onInput(event) {
    console.log('Formula: onInput', event, this);
  }

  onClick(event) {
    console.log('Formula: onClick', event.target.textContent, this);
  }

  $html = /* html */`
    <div class="excel-formula__info">fx</div>
    <div class="excel-formula__input" contenteditable spellcheck="false"></div>
  `;
}
