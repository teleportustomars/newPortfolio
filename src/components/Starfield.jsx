/* eslint-disable react/prop-types */
import { useState, useEffect, useRef, useCallback } from "react";
import { QuadtreeNode } from "./QuadtreeNode.js";
import { Point } from "./Point.js";
import { Star } from "./Star.jsx";
import "./styles/Starfield.css"
import Plane from "./Plane.jsx";

// Starfield component
const Starfield = ({isMobile}) => {

  const starfieldRef = useRef(null);
  const [stars, setStars] = useState([]);
  const [quadTree, setQuadTree] = useState(null);

  const generateStars = (count, quadtree, canvasWidth, canvasHeight) => {
    const generatedStars = [];
    for (let i = 0; i < count; i++) {
      const randomX = Math.random() * canvasWidth;
      const randomY = Math.random() * canvasHeight;
      const starSize = Math.random() * 5;
      //const star = { x: randomX, y: randomY, glowing: false };
      const star = new Point(randomX, randomY, starSize, false);
      quadtree.insert(star, i);
      generatedStars.push(star);
    }
    return generatedStars;
  };

  const starCount = 750;

  const updateStarfield = useCallback(() => {
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    const quadtree = new QuadtreeNode(0, 0, canvasWidth, canvasHeight);

    // Generate and insert random points into the quadtree
    const generatedStars = generateStars(
      starCount,
      quadtree,
      canvasWidth,
      canvasHeight
    );
    setStars(generatedStars);
    setQuadTree(quadtree);
  }, [starCount]);

  useEffect(() => {
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    const quadtree = new QuadtreeNode(0, 0, canvasWidth, canvasHeight);

    // Generate and insert random points into the quadtree
    const generatedStars = generateStars(
      starCount,
      quadtree,
      canvasWidth,
      canvasHeight
    );
    setStars(generatedStars);
    setQuadTree(quadtree);
    const handleResize = () => {
      if(!isMobile){
        updateStarfield();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };

  }, [updateStarfield]);

  useEffect(() => {

    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
  
      if (mouseX && !isMobile) {
        let starIDs = quadTree.queryPointsInRange(mouseX, mouseY, 100);
  
        if (starIDs.length > 0) {
          requestAnimationFrame(() => {
            const updatedStars = [...stars];
            for (let i = 0; i < starIDs.length; i++) {
              updatedStars[starIDs[i]].glowing = true;
            }
            setStars(updatedStars);
  
            setTimeout(() => {
              const updatedStars = [...stars];
              for (let i = 0; i < starIDs.length; i++) {
                updatedStars[starIDs[i]].glowing = false;
              }
              setStars(updatedStars);
            }, 1000);
          });
        }
      }
    };
  
    const addMouseMoveListener = () => {
      window.addEventListener("mousemove", handleMouseMove);
    };
      addMouseMoveListener();
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  
  }, [stars, quadTree]);

  return (
    <div
      className="starfield"
      ref={starfieldRef}
    >
      <Plane />
      {stars.map((star, index) => (
        <Star
          key={index}
          index={index}
          x={star.x}
          y={star.y}
          size={star.size}
          glowing={star.glowing}
        />
      ))}
    </div>
  );
};

export default Starfield;
