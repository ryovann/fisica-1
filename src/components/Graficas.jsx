import { useEffect, useRef } from "react";
import Plotly from "plotly.js-dist";

export default function Graficas ({ graphs }) {
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            Plotly.newPlot( ref.current, [{
                x: [1, 2, 3, 4, 5],
                y: [1, 2, 4, 8, 16] }], {
                margin: { t: 0 } }
            );
        }
    }, []);

    return <div>
        Graficas
        <div ref={ref}></div>
    </div>;
}
