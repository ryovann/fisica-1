import { useCallback } from "react";
import { useConfigStore } from "../store/config.store";

export default function Controls() {
  const [config, setConfig] = useConfigStore();

  console.log(config);

  const updateObjectParameter = useCallback(
    (propertyName, value) => {
      setConfig({
        objectParameters: {
          ...config.objectParameters,
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
        justifyContent: "space-around",
      }}
    >
      <div>
        <label htmlFor="input-follow-object">Follow Object</label>
        <input
          name="input-follow-object"
          id="input-follow-object"
          type="checkbox"
          checked={config.followObject}
          onChange={(event) => toggleFollowObject(event.target.checked)}
        />
      </div>
      <div>
        <label style={{ marginRight: 4 }} htmlFor="input-acceleration">
          Acceleration
        </label>
        <input
          name="input-acceleration"
          id="input-acceleration"
          type="number"
          value={config.objectParameters.acceleration}
          onChange={(event) =>
            updateObjectParameter("acceleration", event.target.value)
          }
        />
      </div>
    </div>
  );
}
