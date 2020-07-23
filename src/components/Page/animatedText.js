import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import VisibilitySensor from "react-visibility-sensor";

const onStart = () => {
  console.log("Animation completed");
};
const AnimatedText = props => {
  const ref = useRef(null);
  let revealWidth = 0;
  useEffect(() => {
    console.log("width", ref.current ? ref.current.offsetWidth : 0);
    revealWidth = ref.current.offsetWidth + 25;
  }, [ref.current]);
  const variants = {
    visible: (custom) => ({ width: custom, x: 0, scale: [1, 1, 1, 1, 1], opacity: [0, 0.25, 0.5, 0.75, 1] }),
    reveal: { width: 0, x: 0, scale: [1, 1, 1, 1, 1], opacity: [1, 0.75, 0.5, 0.25, 0] },
    initial: { scale: 1 },
    initialLine: { width: 0, x: 400 },
    line: (custom) => ({ width: custom, x: 0 }),
    unreveal: (custom) => ({ opacity: 0, x: -custom, width: 0 }),
    scaling: { scale: [0.7, 0.7, 1, 1, 1], x: [0, 0, 0, 0, 75], transformOrigin: "top right" },
    whileHover: {
      x: 20, y: 20,
      transition: { duration: 0.25 }
    }
  };

  const {
    children
  } = props;
  const controls = useAnimation();
  const visibility = (isVisible) => {
    if (isVisible) {
      controls.start(variants.visible);
    } else {
      // controls.set({ opacity: 0, scale: 0.7 })
    }
  };
  return <VisibilitySensor onChange={visibility} partialVisibility={true}>
    {({ isVisible }) => {
      return (
        <div>
          <motion.div animate={isVisible ? "reveal" : "initial"}
                      transition={{ delay: 1, duration: 0.5 }}
                      initial="initial"
                      variants={variants} style={{
            width: "110%", position: "absolute",
            overflow: "hidden"
          }}>
            <a style={{color: "white"}}>Compete</a>
          </motion.div>
          <motion.div custom={revealWidth} animate={isVisible ? "visible" : "unreveal"}
                      initial="unreveal"
                      transition={{ delay: 2, duration: 0.5 }}
                      variants={variants} style={{ position: "absolute", overflow: "hidden" }}>
            <a style={{color: "white", fontFamily: "Cedarville Cursive", lineHeight: "1.25"}} ref={ref}>Cooperation</a>
          </motion.div>
          <motion.div custom={revealWidth} animate={isVisible ? "line" : "initialLine"}
                      transition={{ delay: 1, duration: 0.5 }}
                      initial="initialLine"
                      variants={variants} style={{
            display: "inline-block", position: "relative", overflow: "hidden"
          }}>
            <div style={{ width: revealWidth, borderBottom: "5px solid white" }}>
              <a style={{ color: "transparent" }}>Cooperation</a>
            </div>
          </motion.div>
        </div>
      );
    }}
  </VisibilitySensor>;
};

export default AnimatedText;
// <motion.div animate="visible"
//             transition={{ duration: 1.2, times: [0, 0.6, 0.8, 1.2] }}
//             variants={variants}>
//   {children}
// </motion.div>)
// <motion.div animate={isVisible? "reveal" : "initial"}
//             transition={{ delay: 2, duration: 0.5}}
//             initial="initial"
//             variants={variants} style={{position: "relative",
//   overflow: "hidden"}}>
//   <a>Compete</a>
// </motion.div>
// <motion.div animate={isVisible? "line" : "initialLine"}
// transition={{ delay: 2, duration: 0.5}}
// initial="initialLine"
// variants={variants} style={{position: "relative",
//   overflow: "hidden"}}>
// <motion.div animate={isVisible? "visible" : "unreveal"}
// initial="unreveal"
// transition={{ delay: 2.5, duration: 0.5}}
// variants={variants}>
//   <div style={{display: "inline-block"}}>
// <a>Cooperation</a>
// </div>
// </motion.div>
// <div style={{position: "absolute", display: "inline-block", borderTop: "5px solid white"}}>
// <a style={{color: "transparent"}}>Cooperation</a>
// </div>
// </motion.div>
