import { useState, useEffect, useRef } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const RADIAN = Math.PI / 180;

const generateColors = (num) => {
  const colors = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF8042",
    "#FF3377",
    "#00A9E1",
    "#49A9B7",
    "#FFD700",
    "#8A2BE2",
    "#7FFF00",
    "#D2691E",
    "#DC143C",
    "#FF4500",
    "#2E8B57",
    "#ADFF2F",
    "#FFFF00",
    "#FF6347",
    "#2F4F4F",
    "#A52A2A",
  ];
  const extendedColors = [];
  for (let i = 0; i < num; i++) {
    extendedColors.push(colors[i % colors.length]);
  }
  return extendedColors;
};

const CustomPieChart = ({ data, colors = [], dataKey = "value", title }) => {
  const [showPercentage, setShowPercentage] = useState(true);
  const containerRef = useRef(null); // Ref to calculate size dynamically
  const [outerRadius, setOuterRadius] = useState(80);

  // Ensure correct size calculation on render
  useEffect(() => {
    const updateOuterRadius = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;

        // We want to make sure the chart stays within bounds (not too big)
        let radius = Math.min(containerWidth, containerHeight) / 2 - 20; // Ensure it’s within bounds
        radius = Math.min(radius, 80); // Limit outer radius to a max value (e.g., 80)

        // Further reduce size on smaller screens (mobile/tablet)
        if (window.innerWidth <= 768) {
          radius = Math.min(radius, 60); // For smaller screens, reduce the radius further
        }

        setOuterRadius(radius);
      }
    };

    updateOuterRadius();

    // Update on resize
    window.addEventListener("resize", updateOuterRadius);
    return () => {
      window.removeEventListener("resize", updateOuterRadius);
    };
  }, []);

  // Toggle handler for each chart
  const toggleLabelType = () => {
    setShowPercentage((prev) => !prev);
  };

  // Render custom labels outside of the pie with lines pointing to the labels
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius = 100,
    percent,
    index,
    name,
    value,
  }) => {
    const radius = outerRadius + 20; // Push the label outside of the pie by 10px
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <g>
        <text
          x={x}
          y={y}
          fill="black"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
          fontSize={Math.max(10, 12)} // Prevent label overflow by limiting the font size
        >
          {showPercentage
            ? `${name} / ${(percent * 100).toFixed(0)}%`
            : `${name} / ${value}`}
        </text>
        <line
          x1={cx + outerRadius * Math.cos(-midAngle * RADIAN)}
          y1={cy + outerRadius * Math.sin(-midAngle * RADIAN)}
          x2={x}
          y2={y}
          stroke="black"
          strokeWidth={1}
        />
      </g>
    );
  };

  const adjustedColors = colors.length ? colors : generateColors(data.length);

  return (
    <div
      ref={containerRef}
      className="chart-container shadow-xl w-full sm:w-full h-auto"
      style={{
        aspectRatio: "1", // Ensure the container keeps a 1:1 aspect ratio
        boxSizing: "border-box", // Include padding and border in element's total width and height
        width: "100%",
      }}
    >
      {/* Toggle Button for this specific pie chart */}
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <p className="italic">{title}</p>
        <label>
          <input
            type="checkbox"
            checked={showPercentage}
            onChange={toggleLabelType}
            style={{ marginRight: "10px" }}
          />
          {showPercentage ? "Show Actual Value" : "Show Percentage"}
        </label>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true} // Show lines from pie to labels
            label={renderCustomizedLabel}
            outerRadius={outerRadius}
            fill="#8884d8"
            dataKey={dataKey}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={adjustedColors[index % adjustedColors.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
