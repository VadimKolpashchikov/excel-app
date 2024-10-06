import { Page } from '@core/Page';
import { Excel } from '@components/excel/Excel';
import { Header } from '@components/header/Header';
import { Toolbar } from '@components/toolbar/Toolbar';
import { Formula } from '@components/formula/Formula';
import { Table } from '@components/table/Table';
import { createStore, rootReducer } from '@store';
import { debounce, storage } from '@core/utils';
import { activeRoute } from '@core/router/ActiveRoute';
import { mainPrefix } from '@const/storage';
import { defaultTitle } from '@const/title';

/* eslint-disable import/prefer-default-export */
export class ExcelPage extends Page {
  /* eslint-disable class-methods-use-this */
  getRoot() {
    const EXCEL_STORAGE_NAME = `${mainPrefix}${this.params}`;
    let initState = storage(EXCEL_STORAGE_NAME);

    if (!initState) {
      initState = {
        dateStamp: this.params,
        title: defaultTitle,
      };
      storage(EXCEL_STORAGE_NAME, initState);
    }

    const store = createStore(rootReducer, initState);

    const storageStateListener = debounce((state) => {
      storage(EXCEL_STORAGE_NAME, state);
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
    if (!this.params || !Number(this.params)) {
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
