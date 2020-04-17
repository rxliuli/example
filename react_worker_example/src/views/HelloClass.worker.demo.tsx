import * as React from "react";
import { useEffect } from "react";
import { wrap } from "comlink";
import { HelloClassWorker } from "./HelloClass.worker.type";

type PropsType = {};

const HelloClassWorkerDemo: React.FC<PropsType> = () => {
  useEffect(() => {
    (async () => {
      const HelloClassWorkerClazz = wrap<typeof HelloClassWorker>(
        new Worker("./HelloClass.worker.ts", {
          type: "module"
        })
      );
      const instance = await new HelloClassWorkerClazz();
      console.log(await instance.sum(1, 2));
    })();
  }, []);

  return <div>HelloClassWorker</div>;
};

export default HelloClassWorkerDemo;
