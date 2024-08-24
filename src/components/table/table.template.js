const KEY_CODE_MAP = {
  A: 65,
  Z: 90,
};
const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function toChar(code) {
  return String.fromCharCode(code);
}

function getSizeParam(state, index, defaultValue = 1) {
  const value = state[index] ?? defaultValue;
  return `${value}px`;
}

function getCellContent(id, state) {
  return state[id]?.text ?? '';
}

function createCell(content, colIndex, id, width) {
  return /* html */`
  <div 
    class="cell" 
    contenteditable
    data-type="cell"
    data-col="${colIndex}" 
    data-id="${id}"
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
  return (_, index) => {
    const width = getSizeParam(colState, index, DEFAULT_WIDTH);
    const cellId = `${rowIndex}:${index}`;
    const content = getCellContent(cellId, cellState);
    return createCell(content, index, cellId, width);
  };
}

function maperCol(state = {}) {
  return (_, index) => {
    const width = getSizeParam(state, index, DEFAULT_WIDTH);
    const colContent = toChar(KEY_CODE_MAP.A + index);
    return createCol(colContent, index, width);
  };
}

function createRow(index, content, state = {}) {
  const infoContent = index
    ? /* html */`
        ${index}
        <div class="row-resizer resizer" data-resize="row"></div>
      `
    : '';
  const dataAttrs = index
    ? `data-type="resizable" data-row="${index}"`
    : '';
  const height = getSizeParam(state, index, DEFAULT_HEIGHT);
  return /* html */`
  <div 
    class="row" 
    ${dataAttrs}
    style="height: ${height}"
  >
    <div class="row-info">
      ${infoContent}
    </div>
    <div class="row-data">${content ?? ''}</div>
  </div>
  `;
}

/* eslint-disable import/prefer-default-export */
export function createTable(rowsCount = 1, state = {}) {
  const colsCount = KEY_CODE_MAP.Z - KEY_CODE_MAP.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill('')
    .map(maperCol(state.colState))
    .join('');

  rows.push(createRow(null, cols));

  for (let rowIdx = 0; rowIdx < rowsCount; rowIdx++) {
    const cells = new Array((colsCount))
      .fill('')
      .map(maperCell(state, rowIdx))
      .join('');

    rows.push(createRow(rowIdx + 1, cells, state.rowState));
  }

  return rows.join('');
}
