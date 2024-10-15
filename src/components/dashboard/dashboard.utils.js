import { mainPrefix } from '@const/storage';
import { storage } from '@core/Storage';

export function getRecordTemplate(key) {
  const data = storage.get(key);
  const id = key.replace(mainPrefix, '');
  const title = data.title ?? '?????';
  const date = new Date(data.lastLogin).toLocaleString();

  return /* html */`
    <li class="dashboard__record">
      <a href="#/excel/${id}">${title}</a>
      <strong>${date}</strong>
    </li>
  `;
}

export function getNewTableHref() {
  return `"#/excel/${Date.now().toString()}`;
}

export function createRecordsTable() {
  const storageKeys = storage.getAllStartsWith(mainPrefix);

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
