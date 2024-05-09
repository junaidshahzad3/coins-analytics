import React from "react";

const Legend = ({ Colors }) => {
  return (
    <div className="legend">
      {Colors.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: item.color,
              marginRight: "10px",
            }}
          ></div>
          <div style={{ fontWeight: "bold", color: "black" }}>{item.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Legend;
