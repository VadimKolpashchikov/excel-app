import { Emitter } from '@core/Emitter';
import { Subscriber } from '@core/Subscriber';
import { $ } from '@core/dom';

/* eslint-disable import/prefer-default-export */
export class Excel {
  $className = 'excel';

  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.store = options.store;
    this.emitter = new Emitter();
    this.subscriber = new Subscriber(this.store);
  }

  getRoot() {
    const root = $.createEl('div', this.$className);

    const componetsOptions = {
      emitter: this.emitter,
      store: this.store,
    };

    this.components = this.components.map((Component) => {
      const el = $.createEl('div', Component.$className);
      const component = new Component(el, componetsOptions);
      el.html(component.template);
      root.append(el);

      return component;
    });

    return root;
  }

  render() {
    const nodes = this.getRoot();
    this.$el.append(nodes);

    this.subscriber.subscribeComponents(this.components);
    this.components.forEach((component) => {
      component.init();
    });
  }

  destroy() {
    this.subscriber.unsubscribeAll();
    this.components.forEach((component) => {
      component.destroy();
    });
  }
}
