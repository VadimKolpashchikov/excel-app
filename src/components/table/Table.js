import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';

/* eslint-disable import/prefer-default-export */
export class Table extends ExcelComponent {
  static $className = 'excel-table';

  $html = createTable(15);
}
