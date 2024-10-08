/* eslint-disable import/prefer-default-export */
export class Emitter {
  constructor() {
    this.listeners = {};
  }

  emit(event, args) {
    this.listeners[event]?.forEach((listener) => {
      listener(args);
    });
  }

  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] ?? [];
    this.listeners[event].push(fn);

    return () => {
      this.listeners[event] = this.listeners[event]
        .filter((listener) => listener !== fn);
    };
  }
}
