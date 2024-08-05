import { keyMap } from './table.const';

export function isResizable(event) {
  return !!event.target.dataset.resize;
}

export function isCell(event) {
  return event.target.dataset.type === 'cell';
}

/* eslint-disable no-param-reassign */
export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end];
  }

  const length = end - start + 1;

  return new Array(length).fill('')
    .map((_, idx) => start + idx);
}

export function matrix(target, current) {
  const targetMapId = target.id({ parse: true });
  const currentMapId = current.id({ parse: true });

  const cols = range(currentMapId.col, targetMapId.col);
  const rows = range(currentMapId.row, targetMapId.row);

  const ids = rows.reduce((acc, row) => {
    cols.forEach((col) => acc.push(`${row}:${col}`));
    return acc;
  }, []);

  return ids;
}

export function nextSelector(key, current) {
  let { row, col } = current.id({ parse: true });
  switch (key) {
    case keyMap.enter:
    case keyMap.down:
      row += 1;
      break;
    case keyMap.tab:
    case keyMap.right:
      col += 1;
      break;
    case keyMap.left:
      col -= 1;
      break;
    case keyMap.up:
      row -= 1;
      break;
    default:
      break;
  }

  return `[data-id="${row}:${col}"]`;
}
