import ora from "ora";

class Spinner {
  constructor(text) {
    this.spinner = ora(text);
  }

  start() {
    this.spinner.start();
  }

  stop() {
    this.spinner.stop();
  }

  destroy() {
    this.spinner = null;
  }
}

export default Spinner;
