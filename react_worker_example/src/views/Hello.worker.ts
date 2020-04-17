import { expose } from "comlink";
import { HelloWorker } from "./Hello.worker.type";

const obj: HelloWorker = {
  counter: 0,
  inc() {
    this.counter++;
  },
  info: { city: "GZ" }
};

expose(obj);
