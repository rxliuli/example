import React from "react";
import HelloClassWorkerDemo from "./views/HelloClass.worker.demo";
import HelloWorkerDemo from "./views/hello.worker.demo";
import HelloCallbackWorkerDemo from "./views/HelloCallback.worker.demo";
import { Link, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header>
        <ul>
          <li>
            <Link to="/HelloWorkerDemo">基本示例</Link>
          </li>
          <li>
            <Link to="/HelloCallbackWorkerDemo">使用回调函数</Link>
          </li>
          <li>
            <Link to="/HelloClassWorkerDemo">使用 class</Link>
          </li>
        </ul>
      </header>
      <section>
        <Switch>
          <Route path="/HelloWorkerDemo" component={HelloWorkerDemo} />
          <Route
            path="/HelloCallbackWorkerDemo"
            component={HelloCallbackWorkerDemo}
          />
          <Route
            path="/HelloClassWorkerDemo"
            component={HelloClassWorkerDemo}
          />
        </Switch>
      </section>
    </div>
  );
}

export default App;
