import { Page } from '@core/page/Page';
import { Excel } from '@components/excel/Excel';
import { Header } from '@components/header/Header';
import { Toolbar } from '@components/toolbar/Toolbar';
import { Formula } from '@components/formula/Formula';
import { Table } from '@components/table/Table';
import { createStore, rootReducer } from '@store';
import { debounce } from '@core/methods/utils';
import { mainPrefix } from '@const/storage';
import { initState } from '@const/initState';
import { StateProcessor } from '@core/plagins/StateProcessor';
import { activeRoute } from '@router/ActiveRoute';
import { storage } from '@storage/Storage';

/* eslint-disable import/prefer-default-export */
export class ExcelPage extends Page {
  constructor(param) {
    super(param);

    this.storeSub = null;
    this.processor = new StateProcessor();
  }

  /* eslint-disable class-methods-use-this */
  async getRoot() {
    // const EXCEL_STORAGE_NAME = `${mainPrefix}${this.param}`;
    // const savedState = storage.get(EXCEL_STORAGE_NAME);

    // if (!savedState) {
    //   storage.set(EXCEL_STORAGE_NAME, initState);
    // }
    // const state = savedState ?? initState;
    const state = await this.processor.get();

    const store = createStore(rootReducer, state);

    // const storageStateListener = debounce((state) => {
    //   storage.set(EXCEL_STORAGE_NAME, state);
    // });

    this.storeSub = store.subscribe(this.processor.listen);

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
    this.storeSub.unsubscribe();
    this.viewModel.destroy();
  }
}
