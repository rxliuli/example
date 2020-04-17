import { expose } from "comlink";
import { HelloWorker } from "./hello.worker.type";

const obj: HelloWorker = {
  counter: 0,
  inc() {
    this.counter++;
  },
  info: { city: "GZ" }
};

expose(obj);
