import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const Test = props => {
  const variants = {
    hidden: { transform: "scale(0.6)", transformOrigin: "top left"},
    visible: { transform: ["scale(1)", "translate(50px, 100px)" ], transformOrigin: ["top left", "top left"] }
  };

  const {
    children
  } = props;
  return <motion.div initial="hidden"
                     animate="visible"
                     transition={{ duration: 1 }}
                     variants={variants}>{children}</motion.div>;
};

export default Test;
