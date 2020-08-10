import React, { useEffect, useState } from "react";
import { Div, ThemeProvider, Text, Button, Icon } from "atomize";
import { useStyletron } from "styletron-react";
import { Line, Circle } from "rc-progress";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import { motion, useAnimation } from "framer-motion";
import one from "../../images/png/1.png";
import two from "../../images/png/2.png";
import three from "../../images/png/3.png";

const theme = {
  colors: {
    brand100: "#F9F8FC",
    brand200: "#F3F1FA",
    brand300: "#E9E6F6",
    brand400: "#D2CCEC",
    brand500: "#BCB3E2",
    brand600: "#9C8FD6",
    brand700: "#6F5CC3",
    brand800: "#553EB5",
    brand900: "#382683"
  }
};

const CarouselNews = props => {
  const { sites } = props;
  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 0,
      x: 0,
      opacity: 1,
      width: "100vw"
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };
  const images = [
    one,
    two,
    three
  ];
  const text = [
    <>Welcome <br/> to Radio <br/></>,
    <>General Broadcast <br/> Caption <br/></>,
    <>Some Suitable <br/> Caption <br/></>,
  ];
  const sequence = async () => {
    await controls.start({
      x: ["0%", "-15%"],
      opacity: [1, 0],
      transition: { duration: 0.6, times: [0, 1] }
    });
    setimageIndex((imageIndex + 1) % 3);
    settextIndex((textIndex + 1) % 3);
    controls.start({
      x: ["-10%", "0%"],
      opacity: [0, 1],
      transition: { duration: 0.4, times: [0, 1] }
    });
  };
  const [imageIndex, setimageIndex] = useState(0);
  const [textIndex, settextIndex] = useState(0);
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    if (percent > 100) {
      sequence();
      lineControls.start({
        y: ["0%", "100%", "0%" ,"0%"],
        opacity: [1, 0, 0, 1],
        transition: { duration: 1.025, times: [0, 0.5, 1, 1] }
      });
      textControls.start({
        opacity: [1, 0, 0, 1],
        transition: { duration: 1.025, times: [0, 0.5, 0.8, 1] }
      });
      let timer1 = setTimeout(() => setPercent(0), 1000)
      return () => {
        clearTimeout(timer1)
      }
    }
    setPercent(percent + 0.05)
  },[percent])
  const controls = useAnimation();
  const lineControls = useAnimation();
  const textControls = useAnimation();
  return (
    <React.Fragment>
      <Div h={{xs:"85vh", md:"60vh", lg:"100vh", xl:"100vh"}}>
        <motion.img
          src={images[imageIndex]}
          variants={variants}
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 200 },
            opacity: { duration: 0.2 }
          }}
          style={{height: "100%",
            width: "100vw", backgroundSize: "cover", objectFit: "cover"}}
        />
      </Div>

      <Div pos="absolute" left="10vw" top={{ xs:"8vh", lg: "15vh" }}>
        <motion.div animate={controls}>
          <Text textColor="white" tag="h1" textSize={{ xs:"10vw", lg: "7vw" }} p={{ t: "10px" }}>
            {text[textIndex]}
          </Text>
        </motion.div>
      </Div>
      <Div w={{ xs:"70vw", lg:"55vw" }} pos="absolute" bottom={{xs:"15vh", md:"40vh", lg:"0"}} right="0">
        <motion.div animate={lineControls}>
          <Line
            strokeLinecap="square"
            percent={percent}
            strokeWidth="2"
            strokeColor="#fff"
            trailWidth="0"
            trailColor="#000"
          />
        </motion.div>
        <Div
          className="carouselNews"
          p={{ y: { xs: "1.5rem", lg: "2rem" }, x: { xs:"2rem" , lg: "6rem", xl: "7rem" } }}
          bg="warning300"
        >
          <motion.div animate={textControls}>
          {sites.map(site => {
            const {
              node,
              node: {
                frontmatter: {
                  title,
                  description,
                  action
                }
              }
            } = site;
            return <div>
              <Text textWeight="400" textColor="black500" p={{ b: { lg: "1rem", xl: "1rem" } }} textSize={{xs:"caption", sm:"body", md:"paragraph", lg:"subheader"}} tag="h1">{title}</Text>
              <Text textWeight="300" textSize={{xs:"body", sm:"paragraph", md:"subheader", lg:"subheader", xl:"title"}}  tag="p" w={{ lg: "35vw", xl: "35vw" }} p={{ b: { xs: "1rem", xl: "1rem" } }}>
                {description}
              </Text>
              <Div p={{ t: { lg: "1rem", xl: "1rem" }, b: { lg: "2em", xl: "2rem" } }}>
                <Text tag="p" textSize={{ xs:"subheader", lg:"title" }} onClick={() => location.href = "#"}>
                  {action}
                </Text>
              </Div>
            </div>;
          })}
          </motion.div>
        </Div>
      </Div>
      {/* --- STYLES --- */}

      <style jsx>{`
        h1 {
          font-size: 64px !important;
        }

        .carouselNews {
          background-color: white;
        }

        @keyframes buttonIconMove {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }

        @from-width tablet {
        }

        @from-width desktop {
        }
      `}</style>
    </React.Fragment>
  );
};
{/*CarouselNews.propTypes = {
};*/
}

export default CarouselNews;

export const query = graphql`
  query CarouselQuery {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
