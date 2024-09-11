// import { Excel } from '@components/excel/Excel';
// import { Header } from '@components/header/Header';
// import { Toolbar } from '@components/toolbar/Toolbar';
// import { Formula } from '@components/formula/Formula';
// import { Table } from '@components/table/Table';
import { Router } from '@core/router/Router';
import './scss/style.scss';
// import { createStore, rootReducer } from '@store';
// import { debounce, storage } from '@core/utils';

const router = new Router('#app', {});

// const EXCEL_STORAGE_NAME = 'exele-state';
// const store = createStore(rootReducer, storage(EXCEL_STORAGE_NAME) ?? {});

// const storageStateListener = debounce((state) => {
//   storage(EXCEL_STORAGE_NAME, state);
// });

// store.subscribe(storageStateListener);

// const excel = new Excel('#app', {
//   store,
//   components: [
//     Header,
//     Toolbar,
//     Formula,
//     Table,
//   ],
// });

// excel.render();
