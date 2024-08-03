import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';

/* eslint-disable import/prefer-default-export */
export class Table extends ExcelComponent {
  static $className = 'excel-table';

  constructor(root) {
    super(root, {
      name: 'Table',
      listeners: [
        'mousedown',
      ],
    });
  }

  onMousedown(event) {
    resizeHandler(this.$root, event);
  }

  $html = createTable(150);
}
