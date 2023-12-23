export default class Timer {
  interval: number;

  timeout?: ReturnType<typeof setInterval>;

  callback: () => void;

  constructor(interval: number) {
    this.interval = interval;
    this.timeout = undefined;
    this.callback = () => {};
  }

  start(callback = () => {}) {
    this.callback = callback;

    this.timeout = setInterval(this.callback, this.interval);
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

    this.timeout = setInterval(this.callback, this.interval);
  }

  stop(onStop?: () => void) {
    if (onStop) {
      onStop();
    }

    clearInterval(this.timeout);
  }
}
