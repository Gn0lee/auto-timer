export default class Timer {
  ms: number;

  timeout?: ReturnType<typeof setInterval>;

  callback: () => void;

  constructor(interval: number) {
    this.ms = interval;
    this.timeout = undefined;
    this.callback = () => {};
  }

  start(callback = () => {}) {
    this.callback = callback;

    this.timeout = setInterval(this.callback, this.ms);
  }

  pause(onPause?: () => void) {
    clearInterval(this.timeout);

    if (onPause) {
      onPause();
    }
  }

  restart(onReStart?: () => void) {
    if (onReStart) {
      onReStart();
    }

    this.timeout = setInterval(this.callback, this.ms);
  }

  stop(onStop?: () => void) {
    if (onStop) {
      onStop();
    }

    clearInterval(this.timeout);
  }

  get interval() {
    return this.ms;
  }
}
