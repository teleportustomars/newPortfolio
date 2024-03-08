/* eslint-disable react/prop-types */
import { useState, useEffect, useRef, useCallback } from "react";
import { QuadtreeNode } from "./QuadtreeNode.js"; //base *class*
import { Point } from "./Point.js"; //point *class*
import { Star } from "./Star.jsx"; //star *component*

const Starfield = ({isMobile}) => {

  const starfieldRef = useRef(null);
  const [stars, setStars] = useState([]);
  const [quadTree, setQuadTree] = useState(null);

  //create starfield based on number of stars and canvas size
  const generateStars = (count, quadtree, canvasWidth, canvasHeight) => {
    const generatedStars = [];
    for (let i = 0; i < count; i++) {
      const randomX = Math.random() * canvasWidth;
      const randomY = Math.random() * canvasHeight;
      const starSize = Math.random() * 5;
      const star = new Point(randomX, randomY, starSize, false);
      quadtree.insert(star, i);
      generatedStars.push(star);
    }
    return generatedStars;
  };

  const starCount = 750; //number of stars total

  //regenerate starfield
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

  //regenerate starfield on resize
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
      if(!isMobile){ //do not update starfield on mobile to account for browser bar changing size on scroll
        updateStarfield();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };

  }, [updateStarfield]);

  //make stars glow when user hovers over them
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
  
            //turn off glow after 1 second to create "trailing" effect
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
