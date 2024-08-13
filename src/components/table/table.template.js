const KEY_CODE_MAP = {
  A: 65,
  Z: 90,
};
const DEFAULT_WIDTH = 120;

function toChar(code) {
  return String.fromCharCode(code);
}

function getWidth(state, index) {
  const value = state[index] ?? DEFAULT_WIDTH;
  return `${value}px`;
}

function getCellContent(row, col, state) {
  return state[`${row}:${col}`] ?? '';
}

function createCell(content, rowIndex, colIndex, width) {
  return /* html */`
  <div 
    class="cell" 
    contenteditable
    data-type="cell"
    data-col="${colIndex}" 
    data-id="${rowIndex}:${colIndex}"
    style="width: ${width}"
  >
  ${content}
  </div>
  `;
}

function createCol(content, index, width) {
  return /* html */`
  <div 
    class="column" 
    data-type="resizable" 
    data-col="${index}"
    style="width: ${width}"
  >
    ${content}
    <div class="col-resizer resizer" data-resize="col"></div>
  </div>
  `;
}

function maperCell({ colState = {}, cellState = {} }, rowIndex) {
  return (_, colIndex) => {
    const width = getWidth(colState, colIndex);
    const content = getCellContent(rowIndex, colIndex, cellState);
    return createCell(content, rowIndex, colIndex, width);
  };
}

function maperCol({ colState = {} }) {
  return (_, index) => {
    const width = getWidth(colState, index);
    const colContent = toChar(KEY_CODE_MAP.A + index);
    return createCol(colContent, index, width);
  };
}

function createRow(idx, content = '') {
  const infoContent = idx ? `${idx}<div class="row-resizer resizer" data-resize="row"></div>` : '';

  return /* html */`
  <div class="row" ${infoContent ? 'data-type="resizable"' : ''}>
    <div class="row-info">
      ${infoContent}
    </div>
    <div class="row-data">${content}</div>
  </div>
  `;
}

/* eslint-disable import/prefer-default-export */
export function createTable(rowsCount = 1, state = {}) {
  const colsCount = KEY_CODE_MAP.Z - KEY_CODE_MAP.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill('')
    .map(maperCol(state))
    .join('');

  rows.push(createRow(null, cols));

  for (let rowIdx = 0; rowIdx < rowsCount; rowIdx++) {
    const cells = new Array((colsCount))
      .fill('')
      .map(maperCell(state, rowIdx))
      .join('');

    rows.push(createRow(rowIdx + 1, cells));
  }

  return rows.join('');
}
