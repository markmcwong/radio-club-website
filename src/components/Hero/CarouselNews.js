import React, { useEffect, useState } from "react";
import { Div, ThemeProvider, Text, Button, Icon } from "atomize";
import { useStyletron } from "styletron-react";
import { Line, Circle } from "rc-progress";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";

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
  const [state, toggle] = useState(true);
  const animation = useSpring({ from: { opacity: 0 }, opacity: state ? 1 : 0, config: { duration: 500 } });
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    setPercent(percent + 0.2);
    if (percent >= 100) {
      setPercent(percent % 100);
      console.log("react 100");
      toggle(!state);
    }
  }, [percent]);
  return (
    <React.Fragment>
      <Div pos="absolute" bottom="0" right="0">
        {/*https://github.com/react-component/progress*/}
        <Line
          strokeLinecap="square"
          percent={percent}
          strokeWidth="2"
          strokeColor="#fff"
          trailWidth="0"
        />
        <Div
          className="carouselNews"
          p={{ t: { lg: "2rem", xl: "2rem" }, x: { lg: "6rem", xl: "8rem" } }}
          bg="info300"
        >

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
              <Text p={{ b: { lg: "1rem", xl: "1rem" } }} textSize="heading" tag="h1">{title}</Text>
              <Text tag="p" w={{ lg: "35vw", xl: "35vw" }} p={{ b: { lg: "1rem", xl: "1rem" } }}>
                {description}
              </Text>
              <Div p={{ t: { lg: "1rem", xl: "1rem" }, b: { lg: "2em", xl: "2rem" }  }}>
                <Text tag="a" textSize="title" onClick={() => location.href = "#"}>
                  {action}
                </Text>
              </Div>
            </div>;
          })}
          <animated.div style={animation}>

          </animated.div>
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
CarouselNews.propTypes = {
  data: PropTypes.object.isRequired
};

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
