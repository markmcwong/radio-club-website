import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import VisibilitySensor from "react-visibility-sensor";

const onStart = () => {
  console.log("Animation completed")
};
const Test = props => {
  const variants = {
    visible: { scale: [1, 1, 1, 1, 1], opacity: [0, 0, 0, 0.75, 1]},
    initial: { scale: 0.7 },
    scaling: { scale: [0.7, 0.7, 1, 1, 1], x: [0, 0, 0, 0, 150], transformOrigin: "top left" }
  };

  const {
    children
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
          <motion.div animate={isVisible? "scaling" : "initial"}
                      transition={{ duration: 2, times: [0, 0.4, 0.6, 0.8, 1] }}
                      variants={variants} style={{backgroundColor: "brown", width: "90%"}}>
            <motion.div animate={isVisible? "visible" : "initial"}
                        transition={{  duration: 1.5, times: [0, 0.4, 0.6, 0.75, 1] }}
                        variants={variants} style={{width: "100%"}}>
              {children}
            </motion.div>
          </motion.div>
        );
      }}
  </VisibilitySensor>
};

export default Test;
// <motion.div animate="visible"
//             transition={{ duration: 1.2, times: [0, 0.6, 0.8, 1.2] }}
//             variants={variants}>
//   {children}
// </motion.div>)
