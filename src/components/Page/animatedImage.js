import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import VisibilitySensor from "react-visibility-sensor";
import window from 'global'
const onStart = () => {
  console.log("Animation completed")
};
const AnimatedImage = props => {
  const variants = {
    visible: { scale: [1, 1, 1, 1, 1], opacity: [0, 0, 0, 0.75, 1]},
    initial: { scale: 0.7 },
    scaling: (custom) => ({ scale: [0.7, 0.7, 1, 1, 1], x: [custom, custom, custom, custom, custom], transformOrigin: "top left" }),
    whileHover: {
      x: 20, y: 20,
      transition: { duration: 0.25 }
    }
  };
  let vw = window.innerWidth/25;
  const {
    children, colour
  } = props;
  const controls = useAnimation();
  const visibility = (isVisible) => {
    if(isVisible){
      controls.start(variants.visible)
    }else{
      // controls.set({ opacity: 0, scale: 0.7 })
    }
  }
  return <VisibilitySensor onChange={visibility} partialVisibility={true}>
      {({ isVisible }) => {
        return (
          <motion.div custom={vw} animate={isVisible? "scaling" : "initial"}
                      transition={{ duration: 2, times: [0, 0.4, 0.6, 0.7, 0.85] }}
                      variants={variants} style={{backgroundColor: colour, width: "80%", margin: "20px"}}>
            <motion.div animate={isVisible? "visible" : "initial"}
                        whileHover="whileHover"
                        transition={{  duration: 2, times: [0, 0.4, 0.6, 0.85, 1] }}
                        variants={variants} style={{width: "100%"}}>
              {children}
            </motion.div>
          </motion.div>
        );
      }}
  </VisibilitySensor>
};

export default AnimatedImage;
// <motion.div animate="visible"
//             transition={{ duration: 1.2, times: [0, 0.6, 0.8, 1.2] }}
//             variants={variants}>
//   {children}
// </motion.div>)
