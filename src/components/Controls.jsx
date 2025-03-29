import { useCallback } from "react";
import { useConfigStore } from "../store/config.store";
import { useBallStore } from "../store/ball.store";

export default function Controls() {
  const [config, setConfig] = useConfigStore();
  const [ballData] = useBallStore();

  const updateObjectParameter = useCallback(
    (propertyName, value) => {
      setConfig({
        parameters: {
          ...config.parameters,
          [propertyName]: value,
        },
      });
    },
    [config, setConfig]
  );

  const toggleFollowObject = useCallback(
    (value) => {
      setConfig({ followObject: value });
    },
    [setConfig]
  );

  return (
    <div
      style={{
        border: "1px solid black",
        margin: 20,
        padding: 8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        position: "absolute",
        gap: 10,
        top: 10,
        left: 10,
        backgroundColor: "white",
        width: 200,
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <label htmlFor="input-follow-object">Follow Object</label>
        <input
          name="input-follow-object"
          id="input-follow-object"
          type="checkbox"
          checked={config.followObject}
          onChange={(event) => toggleFollowObject(event.target.checked)}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <label style={{ marginRight: 4 }} htmlFor="input-acceleration">
          Acceleration
        </label>
        <input
          name="input-acceleration"
          id="input-acceleration"
          type="number"
          value={config.parameters.acceleration}
          max={0.5}
          min={0}
          step={0.0001}
          onChange={(event) =>
            updateObjectParameter("acceleration", event.target.value)
          }
        />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <label style={{ marginRight: 4 }} htmlFor="input-initial-velocity">
          Initial Velocity
        </label>
        <input
          name="input-initial-velocity"
          id="input-initial-velocity"
          type="number"
          value={config.parameters.initialVelocity}
          max={0.5}
          min={0}
          step={0.0001}
          onChange={(event) =>
            updateObjectParameter("initialVelocity", event.target.value)
          }
        />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <label style={{ marginRight: 4 }} htmlFor="input-use-initial-velocity">
          Use Initial Velocity
        </label>
        <input
          name="input-use-initial-velocity"
          id="input-use-initial-velocity"
          type="checkbox"
          checked={config.parameters.useInitialVelocity}
          onChange={(event) =>
            updateObjectParameter("useInitialVelocity", event.target.checked)
          }
        />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <label style={{ marginRight: 4 }} htmlFor="input-time">
          Movement Type
        </label>
        <select
          name="input-movement-type"
          id="input-movement-type"
          value={config.movementType}
          onChange={(event) => setConfig({ movementType: event.target.value })}
        >
          <option value="mruv">MRUV</option>
          <option value="mru">MRU</option>
          <option value="mu">MU</option>
        </select>
      </div>
      <div>
        <label style={{ marginRight: 4 }} htmlFor="input-velocity">
          Current Velocity
        </label>
        <input
          name="input-velocity"
          id="input-velocity"
          type="number"
          value={ballData.velocity}
          max={0.5}
          min={0}
          disabled
        />
      </div>
    </div>
  );
}
