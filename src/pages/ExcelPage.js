import { Page } from '@core/page/Page';
import { Excel } from '@components/excel/Excel';
import { Header } from '@components/header/Header';
import { Toolbar } from '@components/toolbar/Toolbar';
import { Formula } from '@components/formula/Formula';
import { Table } from '@components/table/Table';
import { createStore, rootReducer } from '@store';
import { StateManager } from '@core/plagins/StateManager';
import { activeRoute } from '@router/ActiveRoute';
import { LocalStorageManager } from '@storage/LocalStorageManager';

/* eslint-disable import/prefer-default-export */
export class ExcelPage extends Page {
  constructor(param) {
    super(param);

    this.storeSub = null;
    this.stateManager = new StateManager(
      new LocalStorageManager(param),
    );
  }

  async getRoot() {
    const state = await this.stateManager.get();
    const store = createStore(rootReducer, state);
    this.storeSub = store.subscribe(this.stateManager.listen);
    this.viewModel = new Excel({
      store,
      components: [Header, Toolbar, Formula, Table],
    });

    return this.viewModel.getRoot();
  }

  beforeRender(stop) {
    if (!Number(this.param)) {
      activeRoute.adjustPath();
      stop();
      return;
    }

    this.stateManager.init();
  }

  afterRender() {
    this.viewModel.init();
  }

  destroy() {
    this.storeSub?.unsubscribe();
    this.storeSub = null;
    this.viewModel?.destroy();
  }
}
