import { ExcelComponent } from '@core/ExcelComponent';

/* eslint-disable import/prefer-default-export */
export class StateComponent extends ExcelComponent {
  initState(initialState) {
    this.state = { ...initialState };
  }

  setState(newField = {}) {
    this.state = {
      ...this.state,
      ...newField,
    };
    this.$root.html(this.template);
  }
}
