import { $ } from '@core/methods/dom';

/* eslint-disable import/prefer-default-export */
export function Loader() {
  return $.createEl('div', 'loader').html(/* html */`
    <div class="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  `);
}
