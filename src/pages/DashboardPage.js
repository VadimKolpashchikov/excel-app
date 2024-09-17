import { $ } from '@core/dom';
import { Page } from '@core/Page';

/* eslint-disable import/prefer-default-export */
export class DashboardPage extends Page {
  /* eslint-disable class-methods-use-this */
  getRoot() {
    return $.createEl('div', 'dashboard')
      .html(/* html */`
        <div class="dashboard__header">
          <h1>5V Excel Dashboard</h1>
        </div>

        <div class="dashboard__controls">
          <div class="container-small">
            <a href="#" class="dashboard__control-create btn-white">
              Новая<br/> таблица
            </a>
          </div>
        </div>

        <div class="dashboard__table">
          <div class="container-small">
            <div class="dashboard__table-header">
              <span>Название</span>
              <span>Дата открытия</span>
            </div>
            <ul class="dashboard__table-body">
              <li class="dashboard__record">
                <a href="#">Table name 1</a>
                <strong>11.11.1111</strong>
              </li>
              <li class="dashboard__record">
                <a href="#">Table name 2</a>
                <strong>22.22.2222</strong>
              </li>
            </ul>
          </div>
        </div>
      `);
  }
}
