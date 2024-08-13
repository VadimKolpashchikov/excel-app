import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import { keyMap } from '@core/const';
import { actions } from '@store';
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
    const value = this.selectionManager.current.text();
    const id = this.selectionManager.current.id();
    this.$emit('table:input', value);
    this.$dispatch(actions.tableInput({ [id]: value }));
  }

  resizeTable(event) {
    resizeHandler(this.$root, event)
      .then((data) => {
        this.$dispatch(actions.tableResize(data));
      })
      .catch(() => { throw new Error('Table resize error'); });
  }

  onMousedown(event) {
    if (isResizable(event)) {
      this.resizeTable(event);
    } else if (isCell(event)) {
      const target = $(event.target);

      if (event.shiftKey) {
        const cells = matrix(target, this.selectionManager.current)
          .map((id) => this.$root.find(`[data-id="${id}"]`));

        this.selectionManager.selectGroup(cells);
      } else {
        this.selectCell(target);
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

  $html = createTable(150, this.$store.getState());
}
