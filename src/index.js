import { Excel } from '@components/excel/Excel';
import { Header } from '@components/header/Header';
import { Toolbar } from '@components/toolbar/Toolbar';
import { Formula } from '@components/formula/Formula';
import { Table } from '@components/table/Table';
import './scss/style.scss';
import { createStore, rootReducer } from '@store';
import { storage } from '@core/utils';

const EXCEL_STORAGE_NAME = 'exele-state';
const store = createStore(rootReducer, storage(EXCEL_STORAGE_NAME) ?? {});

store.subscribe((state) => {
  storage(EXCEL_STORAGE_NAME, state);
});

const excel = new Excel('#app', {
  store,
  components: [
    Header,
    Toolbar,
    Formula,
    Table,
  ],
});

excel.render();
