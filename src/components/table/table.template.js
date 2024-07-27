const CODES = {
  A: 65,
  Z: 90,
};

function createCell(content) {
  return /* html */`
  <div class="cell" contenteditable>
    ${content}
  </div>
  `;
}

function createCol(col) {
  return /* html */`
  <div class="column">
    ${col}
  </div>
  `;
}

function createRow(content = '', idx = '') {
  return /* html */`
  <div class="row">
    <div class="row-info">${idx}</div>
    <div class="row-data">${content}</div>
  </div>
  `;
}

function toChar(code) {
  return String.fromCharCode(code);
}

/* eslint-disable import/prefer-default-export */
export function createTable(rowsCount = 1) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill('')
    .map((_, idx) => createCol(toChar(CODES.A + idx)))
    .join('');

  const cells = new Array((colsCount))
    .fill('')
    .map(createCell)
    .join('');

  rows.push(createRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(cells, i + 1));
  }

  return rows.join('');
}
