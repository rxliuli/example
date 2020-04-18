import * as React from "react";
import { useEffect } from "react";
import { MapWorkerType } from "./HelloCallback.worker.type";
import { proxy, wrap } from "comlink";

type PropsType = {};

const HelloCallbackWorkerDemo: React.FC<PropsType> = () => {
  useEffect(() => {
    (async () => {
      const map = wrap<MapWorkerType>(
        new Worker("./HelloCallback.worker.ts", {
          type: "module",
        })
      );
      const list = await map(
        [1, 2, 3],
        proxy((i) => i * 2)
      );
      console.log("list: ", list);
    })();
  }, []);

  return <div>HelloConcurrencyWorker</div>;
};

export default HelloCallbackWorkerDemo;
