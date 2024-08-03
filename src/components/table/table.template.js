const CODES = {
  A: 65,
  Z: 90,
};

function createCell(content, colIndex) {
  return /* html */`
  <div class="cell" contenteditable data-col="${colIndex}">
    ${content}
  </div>
  `;
}

function createCol(col, index) {
  return /* html */`
  <div class="column" data-type="resizable" data-col="${index}">
    ${col}
    <div class="col-resizer resizer" data-resize="col"></div>
  </div>
  `;
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

function toChar(code) {
  return String.fromCharCode(code);
}

/* eslint-disable import/prefer-default-export */
export function createTable(rowsCount = 1) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill('')
    .map((_, idx) => createCol(toChar(CODES.A + idx), idx))
    .join('');

  const cells = new Array((colsCount))
    .fill('')
    .map(createCell)
    .join('');

  rows.push(createRow(null, cols));

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(i + 1, cells));
  }

  return rows.join('');
}
