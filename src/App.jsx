import './App.css'

import ApplicationCanvas from './components/ApplicationCanvas';
import Controls from "./components/Controls";
import Graficas from "./components/Graficas";
import ConfigStoreProvider from "./store/config.store";


import React, { useRef, useEffect, useState } from "react";

const MotionSimulation = () => {
  const canvasRef = useRef(null);

  const [motionType, setMotionType] = useState("uniform"); // uniform, mru, mruv
  const [velocity, setVelocity] = useState(50); // px/s
  const [acceleration, setAcceleration] = useState(10); // px/s^2

  const [position, setPosition] = useState({ x: 0, y: 0 }); // px

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let startTime = null;

    let animationFrame;


    
    const draw = (timestamp) => {
      if (!startTime) startTime = timestamp;

      console.log(velocity);


      const t = (timestamp - startTime) / 1000; // Convertir a segundos, deltaT
      ctx.clearRect(0, 0, canvas.width, canvas.height); // clean canvas
      
      let x = 50; // Posición inicial

      const desplazamiento = velocity * t;

      if (motionType === "uniform") {
        x += desplazamiento;
      } else if (motionType === "mru") {
        x += desplazamiento;
      } else if (motionType === "mruv") {
        x += desplazamiento + 0.5 * acceleration * (t * t);
      }


      // useFrame(({ delta }) => {
      //   // ...
      //   const acceleration = ...;
      //   const desplazamiento = ...; // You need to know how this is calculated
      
      //   const newPosition = position.clone();
      //   newPosition.x += desplazamiento + 0.5 * acceleration * (delta * delta);
      //   setPosition(newPosition);
      
      //   // To find the velocity at this point:
      //   const currentVelocity = desplazamiento / delta;
      //   console.log("Current Velocity:", currentVelocity);
      
      //   // ...
      // });

      console.log("Desplazamiento: ", desplazamiento);
      console.log("Aceleración: ", acceleration);
      console.log("Tiempo: ", t);
      console.log("Posición: ", x);

      // Dibuja la pelota
      ctx.beginPath();
      ctx.arc(x, canvas.height / 2, 10, 0, Math.PI * 2);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.closePath();
      
      if (x < canvas.width) {
        animationFrame = requestAnimationFrame(draw);
      }
    };
    
    animationFrame = requestAnimationFrame(draw);
  
    return () => cancelAnimationFrame(animationFrame);
  }, [motionType, velocity, acceleration]);

  return (
    <div>
      <canvas ref={canvasRef} width={600} height={200} style={{ border: "1px solid black" }} />
      <div>
        <button onClick={() => setMotionType("uniform")}>Movimiento Uniforme</button>
        <button onClick={() => setMotionType("mru")}>MRU</button>
        <button onClick={() => setMotionType("mruv")}>MRUV</button>
      </div>
      <div>
        <label>Velocidad: 
          <input type="number" value={velocity} onChange={(e) => setVelocity(Number(e.target.value))} /> px/s
        </label>
        <label>Aceleración: 
          <input type="number" value={acceleration} onChange={(e) => setAcceleration(Number(e.target.value))} /> px/s²
        </label>
      </div>
    </div>
  );
};

// export default MotionSimulation;

function App() {
  return (
    <ConfigStoreProvider>
      <div style={{ width: "800px", height: "600px", border: "1px solid black" }}>
        <ApplicationCanvas color='red'/>
        <Controls />
        <Graficas />
        <MotionSimulation />
      </div>
    </ConfigStoreProvider>
  )
}

export default App
