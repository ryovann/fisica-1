import Plotly from "plotly.js-dist";
import { useEffect, useRef } from "react";
import { useBallStore } from "../store/ball.store";

const VelocityGraph = ({ velocityData }) => {
  const graphRef = useRef(null);

  useEffect(() => {
    if (!graphRef.current) return;

    const trace1 = {
      x: velocityData.x,
      y: velocityData.y,
      mode: "lines",
      name: "Velocity",
      line: {
        color: "blue",
        width: 2,
      },
      hovertemplate: "Time: %{x}<br>Velocity: %{y}<extra></extra>",
    };

    const layout = {
      title: "Velocity vs. Time",
      xaxis: {
        title: "Time", // Ensure this is correctly spelled and within the xaxis object
      },
      yaxis: {
        title: "Velocity", // Ensure this is correctly spelled and within the yaxis object
      },
      grid: {
        rows: 1,
        columns: 1,
        pattern: "independent",
      },
      legend: {
        x: 0,
        y: 1,
        traceorder: "normal",
        font: {
          family: "sans-serif",
          size: 12,
          color: "#000",
        },
        bgcolor: "#E2E2E2",
        bordercolor: "#CCCCCC",
        borderwidth: 2,
      },
    };

    Plotly.newPlot(graphRef.current, [trace1], layout);
  }, [velocityData.x, velocityData.y]);

  return (
    <div
      ref={graphRef}
      style={{ width: 800, height: 600 }} // Added inline styles for width and height
    />
  );
};

const AccelerationGraph = ({ accelerationGraph }) => {
  const graphRef = useRef(null);

  useEffect(() => {
    if (!graphRef.current) return;

    const trace1 = {
      x: accelerationGraph.x,
      y: accelerationGraph.y,
      mode: "lines",
      name: "Acceleration",
      line: {
        color: "red",
        width: 2,
      },
      hovertemplate: "Time: %{x}<br>Acceleration: %{y}<extra></extra>",
    };

    const layout = {
      title: "Acceleration vs. Time",
      xaxis: {
        title: "Time", // Ensure this is correctly spelled and within the xaxis object
      },
      yaxis: {
        title: "Acceleration", // Ensure this is correctly spelled and within the yaxis object
      },
      grid: {
        rows: 1,
        columns: 1,
        pattern: "independent",
      },
      legend: {
        x: 0,
        y: 1,
        traceorder: "normal",
        font: {
          family: "sans-serif",
          size: 12,
          color: "#000",
        },
        bgcolor: "#E2E2E2",
        bordercolor: "#CCCCCC",
        borderwidth: 2,
      },
    };

    Plotly.newPlot(graphRef.current, [trace1], layout);
  }, [accelerationGraph.x, accelerationGraph.y]);

  return (
    <div
      ref={graphRef}
      style={{ width: 800, height: 600 }} // Added inline styles for width and height
    />
  );
};

const DisplacementGraph = ({ displacementGraph }) => {
  const graphRef = useRef(null);

  useEffect(() => {
    if (!graphRef.current) return;

    const trace1 = {
      x: displacementGraph.x,
      y: displacementGraph.y,
      mode: "lines",
      name: "Displacement",
      line: {
        color: "red",
        width: 2,
      },
      hovertemplate: "Time: %{x}<br>Acceleration: %{y}<extra></extra>",
    };

    const layout = {
      title: "Displacement vs. Time",
      xaxis: {
        title: "Time", // Ensure this is correctly spelled and within the xaxis object
      },
      yaxis: {
        title: "Displacement", // Ensure this is correctly spelled and within the yaxis object
      },
      grid: {
        rows: 1,
        columns: 1,
        pattern: "independent",
      },
      legend: {
        x: 0,
        y: 1,
        traceorder: "normal",
        font: {
          family: "sans-serif",
          size: 12,
          color: "#000",
        },
        bgcolor: "#E2E2E2",
        bordercolor: "#CCCCCC",
        borderwidth: 2,
      },
    };

    Plotly.newPlot(graphRef.current, [trace1], layout);
  }, [displacementGraph.x, displacementGraph.y]);

  return (
    <div
      ref={graphRef}
      style={{ width: 800, height: 600 }} // Added inline styles for width and height
    />
  );
};

export default function Graficas() {
  const [data] = useBallStore();

  const history = useRef({
    velocity: { x: [], y: [] },
    acceleration: { x: [], y: [] },
    displacement: { x: [], y: [] },
  });

  useEffect(() => {
    if (data) {
      history.current.velocity.x = [...history.current.velocity.x, data.time];

      history.current.velocity.y = [
        ...history.current.velocity.y,
        data.velocity,
      ];

      if (history.current.velocity.x.length > 5000) {
        history.current.velocity.x.shift();
        history.current.velocity.y.shift();
      }

      // acceleration

      history.current.acceleration.x = [
        ...history.current.acceleration.x,
        data.time,
      ];

      history.current.acceleration.y = [
        ...history.current.acceleration.y,
        data.acceleration,
      ];

      if (history.current.acceleration.x.length > 5000) {
        history.current.acceleration.x.shift();
        history.current.acceleration.y.shift();
      }

      // displacement

      history.current.displacement.x = [
        ...history.current.displacement.x,
        data.time,
      ];

      history.current.displacement.y = [
        ...history.current.displacement.y,
        data.displacement,
      ];

      if (history.current.displacement.x.length > 5000) {
        history.current.displacement.x.shift();
        history.current.displacement.y.shift();
      }
    }
  }, [data]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <VelocityGraph velocityData={history.current.velocity} />
        <AccelerationGraph accelerationGraph={history.current.acceleration} />
        <DisplacementGraph displacementGraph={history.current.displacement} />
      </div>
    </div>
  );
}
