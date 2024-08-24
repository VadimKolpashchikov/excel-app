import { $ } from '@core/dom';
import { StateComponent } from '@core/StateComponent';
import { defaultStyles } from '@const/defaultStyles';
import { createToolbar } from './toolbar.template';

/* eslint-disable import/prefer-default-export */
export class Toolbar extends StateComponent {
  static $className = 'excel-toolbar';

  constructor(root, options = {}) {
    super(root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options,
    });
  }

  prepare() {
    this.initState(defaultStyles);
  }

  init() {
    super.init();

    this.$on('table:select', (cell) => {
      const cellStyles = {
        ...defaultStyles,
        ...cell.css(Object.keys(defaultStyles)),
      };
      this.setState(cellStyles);
    });

    this.$on('table:selectGroup', () => {
      this.setState(defaultStyles);
    });
  }

  get template() {
    this.$template = createToolbar(this.state);

    return super.template;
  }

  onClick(event) {
    const target = $(event.target);
    const { type, value } = target.data;

    if (type === 'button' && value) {
      const newValue = JSON.parse(value);
      this.setState(newValue);
      this.$emit('toolbar:applyStyle', newValue);
    }
  }

  $template = createToolbar(this.state);
}
