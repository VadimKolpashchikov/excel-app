class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  append(n) {
    const node = (n instanceof Dom)
      ? n.$el
      : n;

    this.$el.append(node);
    return this;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  findAll(selector) {
    const nodesList = this.$el.querySelectorAll(selector);
    return Array.from(nodesList).map((el) => $(el));
  }

  addClass(ClassName) {
    this.$el.classList.add(ClassName);

    return this;
  }

  removeClass(ClassName) {
    this.$el.classList.remove(ClassName);

    return this;
  }

  attr(name, value) {
    if (!value) {
      return this.$el.getAttribute(name);
    }

    this.$el.setAttribute(name, value);

    return this;
  }

  get data() {
    return this.$el.dataset;
  }

  get coords() {
    return this.$el.getBoundingClientRect();
  }

  css(styles = {}) {
    if (typeof styles === 'string') {
      return window.getComputedStyle(this.$el)[styles];
    }

    Object.entries(styles).forEach(([key, value]) => {
      if (key.slice(0, 2) === '--') {
        this.$el.style.setProperty(key, value);
      }
      this.$el.style[key] = value;
    });

    return this;
  }
}

/* eslint-disable import/prefer-default-export */
export function $(selector) {
  return new Dom(selector);
}

$.createEl = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }

  return $(el);
};
