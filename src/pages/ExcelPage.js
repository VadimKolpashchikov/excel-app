import { Page } from '@core/Page';
import { Excel } from '@components/excel/Excel';
import { Header } from '@components/header/Header';
import { Toolbar } from '@components/toolbar/Toolbar';
import { Formula } from '@components/formula/Formula';
import { Table } from '@components/table/Table';
import { createStore, rootReducer } from '@store';
import { debounce } from '@core/utils';
import { storage } from '@core/Storage';
import { activeRoute } from '@core/router/ActiveRoute';
import { mainPrefix } from '@const/storage';
import { initState } from '@const/initState';

/* eslint-disable import/prefer-default-export */
export class ExcelPage extends Page {
  /* eslint-disable class-methods-use-this */
  getRoot() {
    const EXCEL_STORAGE_NAME = `${mainPrefix}${this.param}`;
    const savedState = storage.get(EXCEL_STORAGE_NAME);

    if (!savedState) {
      storage.set(EXCEL_STORAGE_NAME, initState);
    }

    const store = createStore(rootReducer, savedState ?? initState);

    const storageStateListener = debounce((state) => {
      storage.set(EXCEL_STORAGE_NAME, state);
    });

    store.subscribe(storageStateListener);

    this.viewModel = new Excel({
      store,
      components: [
        Header,
        Toolbar,
        Formula,
        Table,
      ],
    });

    return this.viewModel.getRoot();
  }

  beforeRender() {
    if (!this.param || !Number(this.param)) {
      activeRoute.adjustPath();
    }
  }

  afterRender() {
    this.viewModel.init();
  }

  destroy() {
    this.viewModel.destroy();
  }
}
