import { parseExpression } from '@core/parser';

/* eslint-disable import/prefer-default-export */
export class TableSelection {
  constructor() {
    this.group = [];
    this.current = null;
  }

  static selectedClassName = 'selected';

  clear() {
    this.group.forEach((cell) => cell.removeClass(TableSelection.selectedClassName));
    this.group = [];
  }

  select(cell) {
    this.clear();
    this.current = cell;
    this.current.focus().addClass(TableSelection.selectedClassName);
    this.group.push(this.current);
  }

  selectGroup(cells = []) {
    this.clear();
    this.group = cells.map((cell) => {
      cell.addClass(TableSelection.selectedClassName);
      return cell;
    });
  }

  get selectedIds() {
    return this.group.map((cell) => cell.id());
  }

  applyStyles(styles = {}) {
    this.group.forEach((el) => {
      el.css(styles);
    });
  }

  applyValue(value = '') {
    this.group.forEach((el) => {
      el.attr('data-value', value)
        .text(parseExpression(value));
    });
  }
}
