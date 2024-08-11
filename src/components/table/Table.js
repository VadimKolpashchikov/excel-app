import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import { keyMap } from '@core/const';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { TableSelection } from './TableSelection';
import {
  isResizable, isCell, matrix, nextSelector,
} from './table.utils';

/* eslint-disable import/prefer-default-export */
export class Table extends ExcelComponent {
  static $className = 'excel-table';

  constructor(root, options = {}) {
    super(root, {
      name: 'Table',
      listeners: [
        'mousedown',
        'keydown',
        'input',
      ],
      ...options,
    });
  }

  prepare() {
    this.selectionManager = new TableSelection();
  }

  init() {
    super.init();
    const startingCell = this.$root.find('[data-id="0:0"]');
    this.selectCell(startingCell);

    this.$on('formula:done', () => {
      this.selectionManager.current.focus();
    });

    this.$on('formula:input', (text) => {
      this.selectionManager.current.text(text);
    });
  }

  selectCell(cell) {
    if (!cell) return;
    this.selectionManager.select(cell);
    this.$emit('table:select', cell);
  }

  onInput() {
    this.$emit('table:input', this.selectionManager.current);
  }

  onMousedown(event) {
    if (isResizable(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const target = $(event.target);

      if (event.shiftKey) {
        const cells = matrix(target, this.selectionManager.current)
          .map((id) => this.$root.find(`[data-id="${id}"]`));

        this.selectionManager.selectGroup(cells);
      } else {
        this.selectionManager.select(target);
        this.$emit('table:select', target);
      }
    }
  }

  onKeydown(event) {
    const keys = Object.values(keyMap);

    const { key } = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();

      const nextCell = this.$root.find(nextSelector(key, this.selectionManager.current));
      this.selectCell(nextCell);
    }

    return this;
  }

  $html = createTable(150);
}
