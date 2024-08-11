import { ExcelComponent } from '@core/ExcelComponent';

/* eslint-disable import/prefer-default-export */
export class Header extends ExcelComponent {
  static $className = 'excel-header';

  constructor(root, options = {}) {
    super(root, {
      name: 'Header',
      ...options,
    });
  }

  $html = /* html */`
    <input
      type="text"
      class="input excel-header__input"
      placeholder="Новая таблица"
      value=""
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
