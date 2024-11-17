import { mainPrefix } from '@const/storage';
import { storage } from '@storage/Storage';

function recordsMaper(key) {
  const data = storage.get(key);
  return {
    ...storage.get(key),
    id: key.replace(mainPrefix, ''),
    date: new Date(data.lastChange),
  };
}

export function getRecordTemplate(data = {}) {
  const title = data.title ?? '?????';
  const date = data.date.toLocaleString();

  return /* html */`
    <li class="dashboard__record">
      <a href="#/excel/${data.id}">${title}</a>
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
      <span>Последнее изменение</span>
    </div>
    <ul class="dashboard__table-body">
${storageKeys.map(recordsMaper)
    .sort((a, b) => b.date - a.date)
    .map(getRecordTemplate)
    .join('')
}
    </ul>
  `;
}
