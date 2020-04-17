import { HelloClassWorker } from "./HelloClass.worker.type";
import { expose } from "comlink";

class HelloClassWorkerImpl implements HelloClassWorker {
  sum(...args: number[]): number {
    return args.reduce((res, i) => res + i, 0);
  }
}

expose(HelloClassWorkerImpl);
