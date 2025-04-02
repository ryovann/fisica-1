import "./App.css";

import ApplicationCanvas from "./components/ApplicationCanvas";
import Controls from "./components/Controls";
import Graficas from "./components/Graficas";
import ConfigStoreProvider from "./store/config.store";
import BallStoreProvider from "./store/ball.store";

function App() {
  return (
    <ConfigStoreProvider>
      <BallStoreProvider>
        <ApplicationCanvas color="red" />
        <Controls />
        <Graficas />
      </BallStoreProvider>
    </ConfigStoreProvider>
  );
}

export default App;
