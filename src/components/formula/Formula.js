import { ExcelComponent } from '@core/component/ExcelComponent';
import * as keyMap from '@const/keyboardKeys';
import { $ } from '@core/methods/dom';

/* eslint-disable import/prefer-default-export */
export class Formula extends ExcelComponent {
  static $className = 'excel-formula';

  constructor(root, options = {}) {
    super(root, {
      name: 'Formula',
      listeners: ['input', 'click', 'keydown'],
      ...options,
    });
  }

  init() {
    super.init();
    this.formula = this.$root.find('[data-type="formula"]');

    this.$on('table:select', (cell) => {
      const formulaText = cell.data.value ?? '';
      this.formula?.text(formulaText);
    });
  }

  watchers = {
    lastInputValue(newVal) {
      this.formula?.text(newVal);
    },
  };

  onInput(event) {
    this.$emit('formula:input', $(event.target).text());
  }

  onKeydown(event) {
    switch (event.key) {
      case keyMap.TAB:
      case keyMap.ENTER:
        event.preventDefault();
        this.$emit('formula:done');
        break;
      default:
        break;
    }
  }

  onClick(event) {
    if (event) {
      return this;
    }
    return this;
  }

  $template = /* html */`
    <div class="excel-formula__info">fx</div>
    <div 
      class="excel-formula__input" 
      contenteditable 
      spellcheck="false"
      data-type="formula"
      >
      </div>
  `;
}
