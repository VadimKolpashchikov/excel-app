import { mainPrefix } from '@const/storage';
import { $ } from '@core/dom';
import { ExcelComponent } from '@core/ExcelComponent';
import { activeRoute } from '@core/router/ActiveRoute';
import { storage } from '@core/Storage';
import { actions } from '@store';

/* eslint-disable import/prefer-default-export */
export class Header extends ExcelComponent {
  static $className = 'excel-header';

  $titleInputId = 'table-title-input';

  constructor(root, options = {}) {
    super(root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  init() {
    super.init();
    this.$titleInput = this.$root.find(`#${this.$titleInputId}`);
  }

  onInput() {
    if (this.$titleInput) {
      const title = this.$titleInput.text();
      this.$dispatch(actions.changeTitle({ title }));
    }
  }

  /* eslint-disable class-methods-use-this */
  onClick(event) {
    const target = $(event.target);
    const actionType = target.data.action;

    switch (actionType) {
      case 'exit':
        activeRoute.navigate('');
        break;
      case 'delete':
        /* eslint-disable no-alert */
        if (window.confirm(
          `Вы действительно хотите удалить таблицу ${this.$store.getState('title')}?`,
        )) {
          const storageName = `${mainPrefix}${activeRoute.param}`;
          storage.delete(storageName);
          activeRoute.navigate('');
        }

        break;
      default:
        event?.preventDefault?.();
    }
  }

  get template() {
    return /* html */`
    <input
      type="text"
      class="input excel-header__input"
      placeholder="Новая таблица"
      id="${this.$titleInputId}"
      value="${this.$store.getState('title')}"
    />
    <div class="excel-header__buttons">
      <button class="btn" type="button" data-action="delete">
        <i class="material-symbols-outlined" style="pointer-events: none">
          delete
        </i>
      </button>
      <button class="btn" type="button" data-action="exit">
        <i class="material-symbols-outlined" style="pointer-events: none">
          logout
        </i>
      </button>
    </div>
  `;
  }
}
