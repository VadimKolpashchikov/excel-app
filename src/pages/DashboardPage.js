import { Page } from '@core/Page';
import { Dashboard } from '@components/dashboard/Dashboard';

/* eslint-disable import/prefer-default-export */
export class DashboardPage extends Page {
  getRoot() {
    this.viewModel = new Dashboard();

    return this.viewModel.getRoot();
  }
}
