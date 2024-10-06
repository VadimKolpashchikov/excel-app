import { mainPrefix } from '@const/storage';
import { storage } from '@core/utils';
/* eslint-disable import/prefer-default-export */
export function getRecordTemplate(key) {
  const data = storage(key);
  const title = data.title ?? '?????';
  const date = new Date(+data.dateStamp).toLocaleString();

  return /* html */`
    <li class="dashboard__record">
      <a href="#/excel/${data.dateStamp}">${title}</a>
      <strong>${date}</strong>
    </li>
  `;
}

export function getNewTableHref() {
  return `"#/excel/${Date.now().toString()}`;
}

function getAllStorageKeys() {
  const result = [];

  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);

    if (key.includes(mainPrefix)) {
      result.push(key);
    }
  }

  return result;
}

export function createRecordsTable() {
  const storageKeys = getAllStorageKeys();

  if (!storageKeys.length) {
    return /* html */`
      <p class="dashboard__table-empty">
        Созданные таблицы отсутствуют.
        <br/>
        <a href=${getNewTableHref()}">
          Создать таблицу
        </a>
      </p>
  `;
  }

  return /* html */ `
    <div class="dashboard__table-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>
    <ul class="dashboard__table-body">
      ${storageKeys.map(getRecordTemplate).join('')}
    </ul>
  `;
}
