import React from "react";

const StarComponent = React.memo(({ x, y, size, glowing, index }) => {
  const style = React.useMemo(() => ({
    position: "absolute",
    left: x,
    top: y,
    width: size + "px",
    height: size + "px",
    boxShadow: glowing ? '0px 0px 10px #fbfb98, 0px 0px 5px white, 0px 0px 30px #fbfb98' : 'none',
    backgroundColor: glowing ? "white" : "#fbfb98",
    transform: glowing ? "scale(1.8)" : "scale(1)",
    borderRadius: "50%",
    pointerEvents: "auto",
    transition: "box-shadow 0.1s ease-in",
    willChange: "transform, box-shadow"
  }), [x, y, size, glowing]); // Dependencies array

  return (
    <div
      id={`star-${index}`}
      style={style}
    />
  );
});

StarComponent.displayName = 'Star';


export { StarComponent as Star };