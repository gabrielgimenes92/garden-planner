import React, { useEffect, useRef, useState } from "react";
import { CSSProperties } from "react";

const GardenCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const isClicked = useRef<boolean>(false);

  const canvasRef = useRef(null);

  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);
  const [boxPosition, setBoxPosition] = useState({
    top: 0,
    left: 0,
    height: 30,
    width: 30,
    backgroundColor: "blue",
    position: "absolute",
    cursor: "pointer",
  });

  let gardenSize = {
    width,
    height,
    border: "1px solid black",
    position: "relative",
  };

  useEffect(() => {
    console.log("loaded");

    const box = boxRef.current;
    const container = containerRef.current;

    const onMouseDown = (e: MouseEvent) => {
      console.log("mouse down");
      isClicked.current = true;
    }

    const onMouseUp = (e: MouseEvent) => {
      console.log("mouse up");
      isClicked.current = false;
    }

    const onMouseMove = (e: MouseEvent) => {
      if(!isClicked.current) return;

      console.log(`x: ${e.clientX}, y: ${e.clientY}`)

      let newLeft = e.clientX - 15;
      let newTop = e.clientY - 15;
      setBoxPosition((boxPosition) => ({
        ...boxPosition,
        left: newLeft,
        top: newTop,
    }))
    }


    box.addEventListener("mousedown", onMouseDown);
    box.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);

    const cleanup = () => {
      box.removeEventListener("mousedown", onMouseDown);
      box.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
    };

    return cleanup;
  }, []);

  const moveBox = () => {};

  return (
    <>
      <div style={gardenSize} ref={containerRef}>
        <div
          style={boxPosition}
          ref={boxRef}
          onClick={() => {
            moveBox();
          }}
        />
      </div>
      <button
        onClick={() => {
          setWidth(width + 1);
          setHeight(height + 1);
        }}
      >
        Bigger
      </button>
      <button
        onClick={() => {
          setWidth(width - 1);
          setHeight(height - 1);
        }}
      >
        Smaller
      </button>
      <button
        onClick={() => {
          let newLeft = boxPosition.left - 10;
          setBoxPosition((boxPosition) => ({
            ...boxPosition,
            left: newLeft,
          }));
          console.log("going left");
        }}
      >
        left
      </button>
      <button
        onClick={() => {
          let newLeft = boxPosition.left + 10;
          setBoxPosition((boxPosition) => ({
            ...boxPosition,
            left: newLeft,
          }));
          console.log("going right");
        }}
      >
        right
      </button>
    </>
  );
};

export default GardenCanvas;
