import { ExcelComponent } from '@core/ExcelComponent';
import { keyMap } from '@core/const';
import { $ } from '@core/dom';

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
      this.formula?.text(cell.text());
    });
  }

  watchers = {
    currentText(newVal) {
      this.formula?.text(newVal);
    },
  };

  onInput(event) {
    this.$emit('formula:input', $(event.target).text());
  }

  onKeydown(event) {
    switch (event.key) {
      case keyMap.tab:
      case keyMap.enter:
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

  $html = /* html */`
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
