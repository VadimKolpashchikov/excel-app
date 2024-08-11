import { Emitter } from '@core/Emitter';
import { $ } from '@core/dom';

/* eslint-disable import/prefer-default-export */
export class Excel {
  $className = 'excel';

  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.emitter = new Emitter();
  }

  getRoot() {
    const root = $.createEl('div', this.$className);

    const componetsOptions = {
      emitter: this.emitter,
    };

    this.components = this.components.map((Component) => {
      const el = $.createEl('div', Component.$className);
      const component = new Component(el, componetsOptions);
      el.html(component.getHTML());
      root.append(el);

      return component;
    });

    return root;
  }

  render() {
    const nodes = this.getRoot();
    this.$el.append(nodes);

    this.components.forEach((component) => {
      component.init();
    });
  }

  destroy() {
    this.components.forEach((component) => {
      component.destroy();
    });
  }
}
