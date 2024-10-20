import { Router } from '@core/router/Router';
import './scss/style.scss';
import { DashboardPage } from './pages/DashboardPage';
import { ExcelPage } from './pages/ExcelPage';

/* eslint-disable no-unused-vars */
const router = new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
});
