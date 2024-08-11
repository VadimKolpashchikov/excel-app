import { ExcelComponent } from '@core/ExcelComponent';

/* eslint-disable import/prefer-default-export */
export class Toolbar extends ExcelComponent {
  static $className = 'excel-toolbar';

  constructor(root, options = {}) {
    super(root, {
      name: 'Toolbar',
      ...options,
    });
  }

  $html = /* html */`
    <button class="btn" type="button">
      <i class="material-symbols-outlined"> format_bold </i>
    </button>
    <button class="btn" type="button">
      <i class="material-symbols-outlined"> format_italic </i>
    </button>
    <button class="btn" type="button">
      <i class="material-symbols-outlined"> format_underlined </i>
    </button>
    <button class="btn" type="button">
      <i class="material-symbols-outlined"> format_align_left </i>
    </button>
    <button class="btn" type="button">
      <i class="material-symbols-outlined"> format_align_center </i>
    </button>
    <button class="btn" type="button">
      <i class="material-symbols-outlined"> format_align_right </i>
    </button>
  `;
}
