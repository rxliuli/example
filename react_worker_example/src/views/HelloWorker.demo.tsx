import * as React from "react";
import { useEffect } from "react";
import { wrap } from "comlink";
import { HelloWorker } from "./Hello.worker.type";

type PropsType = {};

const HelloWorkerDemo: React.FC<PropsType> = () => {
  useEffect(() => {
    (async () => {
      const obj = wrap<HelloWorker>(
        new Worker("./hello.worker.ts", { type: "module" })
      );
      console.log(`Counter: ${await obj.counter}`);
      await obj.inc();
      console.log(`Counter: ${await obj.counter}`);
      console.log(`Counter: ${await obj.info.city}`);
    })();
  }, []);
  return <div>HelloWorkerDemo</div>;
};

export default HelloWorkerDemo;
