import React, { useEffect, useState } from "react";
import { Div, ThemeProvider, Text, Button, Icon } from "atomize";
import { useStyletron } from "styletron-react";
import { Line, Circle } from "rc-progress";

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
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    setPercent((percent + 0.15) % 100);
  }, [percent]);
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Div pos="absolute"
             bottom="0"
             right="0">
          <Line strokeLinecap="square" percent={percent} strokeWidth="2" strokeColor="#fff" trailWidth="0"/>
          <Div
            className="carouselNews"
            p={{ y: { lg: "3rem", xl: "4rem" }, x: { lg: "6rem", xl: "8rem" } }}
            bg="warning700"
          >
            <Text tag="h2" textSize="display1" p={{ b: { lg: "1rem", xl: "2rem" } }}>
              OCamp Details&nbsp; <strong></strong>
            </Text>
            <Text tag="p" w={{ lg: "35vw", xl: "35vw" }} p={{ b: { lg: "1rem", xl: "1rem" } }}>orem ipsum dolor sit
              amet,
              consectetur adipiscing elit.
              Etiam velit urna, dictum sed lacus in, elementum hendrerit erat.
              Etiam sollicitudin mauris quis massa bibendum pellentesque.</Text>
            <a href="#">Learn more! <Icon name="LongRight" size="20px"/></a>
          </Div>
        </Div>
        {/* --- STYLES --- */}
        <style jsx>{`
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
    </ThemeProvider>
  );
};

export default CarouselNews;
