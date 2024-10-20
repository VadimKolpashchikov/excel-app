import { $ } from '@core/dom';
import { createRecordsTable, getNewTableHref } from './dashboard.utils';

/* eslint-disable import/prefer-default-export */
export class Dashboard {
  $className = 'excel';

  getRoot() {
    const root = $.createEl('div', this.$className);

    root.html(/* html */`
        <div class="dashboard__header">
          <h1>5V-Excel. Dashboard</h1>
        </div>

        <div class="dashboard__controls">
          <div class="container-small">
            <a href=${getNewTableHref()}" class="dashboard__control-create btn-white">
              Новая<br/> таблица
            </a>
          </div>
        </div>
        <div class="dashboard__table">
          <div class="container-small">
            ${createRecordsTable()}
          </div>
        </div>
      `);

    return root;
  }
}
