import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { graphql } from "gatsby";
import ReactDOM from "react-dom";

require("core-js/fn/array/find");

import AlgoliaIcon from "!svg-react-loader!../images/svg-icons/search-by-algolia.svg?name=AlgoliaLogo";
import { Col, Image, Row, Text, Div } from "atomize";
import placeholder from "../images/png/placeholder.png";
import newsTeamImage from "../images/jpg/20gb.jpg";
import { motion, useAnimation } from "framer-motion";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";

const ActivitiesPage = props => {
  const {
    data: {
      allJongJson: { edges: jongs = [] },
      allFile: { edges: files = [] },
      allActivitiesJson: { edges: activities = [] }
    }
  } = props;
  const backgroundControls = useAnimation();
  const animationControls = useAnimation();
  const opacityControls = useAnimation();
  const overlayControls = useAnimation();
  const [filter, setFilter] = useState("");
  const [activityFilter, setActivityFilter] = useState("General Broadcasting");
  const reverse = () => {
    console.log("reversing")
    opacityControls.start({
      opacity: 1
    });
    animationControls.start({
      position: "fixed",
      transition: { duration: 0.75, times: [0, 0.5, 0.8, 1] },
      display: "none"
    });
    backgroundControls.start({
      height: [ "100vh", "40vh"],
      position: "fixed",
      display: "none",
      top: -1,
      width: "100vw",
      zIndex: "-1",
      transition: { duration: 0.5, times: [0, 1] }
    });
    overlayControls.start({
      opacity: [1, 0],
      display: "none",
      transition: { duration: 0.5, delay: 0.5, times: [0, 1] }
    });
  };
  return (
    <React.Fragment>
      <motion.div style={{ display: "none" }} animate={animationControls}>
        <Div
          bg="white"
          h="20vh"
          w="20vw"
          shadow="3"
          bottom="5vh"
        />
      </motion.div>
      <Row h="40vh" bg="warning500"
           p={{ t: "5%", b: "5%", l: { xl: "7.5vw", lg: "5vw" }, r: { xl: "7.5vw", lg: "5vw" } }}>
        {/*  <Col size="4">*/}
        {/*    <Article theme={theme}>*/}
        {/*  <header>*/}
        {/*    <Headline title="About Us" theme={theme} />*/}
        {/*  </header>*/}
        {/*  {categoryList.map(item => (*/}
        {/*    <section key={item[0]}>*/}
        {/*      <h2>*/}
        {/*        <FaTag /> {item[0]}*/}
        {/*      </h2>*/}
        {/*      <List edges={item[1]} theme={theme} />*/}
        {/*    </section>*/}
        {/*  ))}*/}
        {/*  /!* --- STYLES --- *!/*/}
        {/*  <style jsx>{`*/}
        {/*    h2 {*/}
        {/*      margin: 0 0 0.5em;*/}
        {/*    }*/}
        {/*    h2 :global(svg) {*/}
        {/*      height: 0.8em;*/}
        {/*      fill: ${theme.color.brand.primary};*/}
        {/*    }*/}
        {/*  `}</style>*/}
        {/*</Article>*/}
        {/*  </Col>*/}
        <Col size="7">
          <motion.div animate={opacityControls}>
            <Text tag="h1" textSize="6vw" p={{ t: "10px" }}>
              Interested in our Events & Activities?
            </Text>
          </motion.div>
        </Col>
        <Col p={{ t: "5vh" }} size="5">
          <motion.div animate={opacityControls}>
            <Text tag="h1" textWeight="400" textSize="subheader" p={{ y: "2.5vh" }}>
              This year's events & activities →
            </Text>
            <Div
              bgImg={placeholder}
              bgSize="cover"
              bgPos="center"
              h="30vh"
              w="100%"
              shadow="3"
            />
          </motion.div>
        </Col>

      </Row>
      <motion.div animate={backgroundControls}>
        <Div h="100%" bg="warning500">
        </Div>
      </motion.div>
      <Div h="45vh" m={{ t: "-20px", b: "10%", l: { xl: "7.5vw", lg: "5vw" }, r: { xl: "7.5vw", lg: "5vw" } }}>
        <motion.div style={{ height: "100%" }} animate={opacityControls}>
          <Text tag="h4" textWeight="400" textSize="subheader" p={{ t: "10vh", y: "2.5vh" }}>
            Past year events
          </Text>
          <Div d="flex" minW="100%" h="100%" overflow="visible scroll" style={{ overflowY: "hidden" }}>
            {jongs.map((jong, i) => {
              // tests.map(test => {});
              const {
                node,
                node: { name, year }
              } = jong;
              const posRef = useRef();
              const actions = () => {
                const { offsetTop, offsetLeft } = posRef.current;
                const left = offsetLeft / window.innerWidth * 100;
                let margin = 0;
                margin = (left - 45) / 3;
                console.log(offsetLeft / window.innerWidth * 100);
                animationControls.start({
                  position: "fixed",
                  opacity: 1,
                  x: [left + "vw", (45 + 2 * margin) + "vw", (45 + 1 * margin) + "vw", "45vw"],
                  y: ["80vh", "50vh", "40vh", "40vh"],
                  scale: [1, 1.5, 2, 3.5],
                  transition: { duration: 0.75, times: [0, 0.5, 0.8, 1] },
                  display: "block"
                });
                opacityControls.start({
                  opacity: 0
                });
                backgroundControls.start({
                  height: ["40vh", "100vh"],
                  position: "fixed",
                  top: 0,
                  width: "100vw",
                  display: "block",
                  zIndex: "-1",
                  transition: { duration: 0.5, times: [0, 1] }
                });
                overlayControls.start({
                  opacity: [0, 1],
                  display: "block",
                  transition: { duration: 0.5, delay: 0.5, times: [0, 1] }
                });
              };
              return (
                <Div ref={posRef} w="25%" p={{ y: "20px", r: "20px" }} d="inline-block" h="100%"
                     style={{ cursor: "pointer" }} onClick={(e) => actions(e)}>
                  <Text tag="h4" textWeight="400" textSize="subheader" p={{ y: "2.5vh" }}>
                    {name}
                  </Text>
                  {
                    files[i] && files[i].node.base.startsWith("ex-") &&
                    <Div
                      bgImg={files[i].node.childImageSharp.fluid.src}
                      bgSize="cover"
                      bgPos="center"
                      w="20vw"
                      h="80%"
                      shadow="4"
                      onClick={() =>
                        setFilter(year)}
                    />
                  }
                  {/*<Div*/}
                  {/*  shadow="3"*/}
                  {/*  bgImg={placeholder}*/}
                  {/*  bgSize="cover"*/}
                  {/*  bgPos="center"*/}
                  {/*  w="20vw"*/}
                  {/*  h="80%"*/}
                  {/*  shadow="3"*/}
                  {/*/>*/}
                </Div>
              );
            })}
          </Div>
        </motion.div>
      </Div>
      <motion.div style={{ display: "none" }} animate={overlayControls}>
        <Div pos="absolute" left="0" top="0" bg="warning500">
          <Row h="100vh" p={{ b: "10vh", t: "10vh", x: { xl: "4vw", lg: "2vw" } }}>
            <Div>
              <Text onClick={() => reverse()} pos="absolute" tag="p" textWeight="300" textSize="title" p={{ l: "2.5%" }}>
                ←Back
              </Text>
            </Div>
            <Col size="4" p="2.5%" d="flex" align="center">
              <Image shadow="4" src={files.filter(function(img) {
                return img.node.base.startsWith(filter)
                  && img.node.base.endsWith(activityFilter + ".jpg");
              })[0].node.childImageSharp.fluid.src} style={{ zIndex: 2 }}/>
            </Col>
            <Col shadow="5" style={{
              marginLeft: "-15vw",
              paddingLeft: "15vw",
              maxWidth: "80%",
              flex: "0 1 80%"
            }} d="flex" align="center" flexDir="row" size="8" bg="white">
              {activities.map((activity, i) => {
                const {
                  node,
                  node: {
                    title,
                    year,
                    subtitle1,
                    subtitle2,
                    content1,
                    content2
                  }
                } = activity;
                console.log(filter);
                if (year == filter && activityFilter == title) {
                  return (
                    <Col h="100%" size="7" d="flex" align="center" p={{ t: "2.5%", l: { xl: "3vw", lg: "2vw" } }}>
                      <div>
                        <Text tag="h1" textSize="display3" p={{ t: "10px" }}>
                          {title}
                        </Text>
                        <Text tag="h6" textSize="display1" p={{ t: "30px" }}>
                          {subtitle1}
                        </Text>
                        <Text tag="p" textWeight="200" textSize="title" p={{ t: "20px" }}>
                          {content1}
                        </Text>
                        <Text tag="h6" textSize="display1" p={{ t: "30px" }}>
                          {subtitle2}
                        </Text>
                        <Text tag="p" textWeight="200" textSize="title" p={{ t: "20px" }}>
                          {content2}
                        </Text>
                      </div>
                    </Col>
                  );
                }
              })
              }
              <Col shadow="5" h="80vh" size="5" overflow="scroll" style={{ overflowX: "hidden" }}>
                {activities.map((activity, i) => {
                  const {
                    node,
                    node: {
                      title,
                      year,
                      jong
                    }
                  } = activity;

                  let filteredImg = files.filter(function(img) {
                    console.log(img.node.base);
                    return img.node.base.startsWith(filter)
                      && img.node.base.endsWith(title + ".jpg");
                  })[0];
                  console.log(filteredImg);
                  console.log(filter, activityFilter);
                  if (year == filter) {
                    return (
                      <Div shadow="3" m="5px" d="flex" flexDir="row" p={{ y: "10px" }} cursor="pointer" onClick={() =>
                        setActivityFilter(title)}>
                        <Col size="3" align="center" d="flex" flexDir="row">
                          <Image h="5" shadow="5" style={{ objectFit: "cover", zIndex: 2 }}
                                 src={filteredImg && filteredImg.node.childImageSharp.fluid.src}/>
                        </Col>
                        <Col size="8" align="center" d="flex" flexDir="row">
                          <Div>
                            <Text textWeight="200" tag="h6" textSize="subheader" p={{ l: "20px" }}>
                              {title}
                            </Text>
                            <Text textColor="info600" textWeight="300" tag="h6" textSize="subheader"
                                  p={{ l: "20px", t: "5px" }}>
                              {jong}
                            </Text>
                          </Div>
                        </Col>
                      </Div>
                    );
                  }
                })
                }
              </Col>
            </Col>
          </Row>
        </Div>
      </motion.div>
      {/* --- STYLES --- */}
      <style jsx>{`
        .icon {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 20px;
        }
        .icon :global(svg) {
          height: 30px;
        }
      `}</style>
      ;
    </React.Fragment>
  )
    ;
};

ActivitiesPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default ActivitiesPage;
export const query = graphql`
  query ActivitiesQuery {
    allJongJson {
      edges {
        node {
          name
          year
        }
      }
    }
    allActivitiesJson {
      edges {
        node {
          title
          year
          subtitle1
          subtitle2
          content1
          content2
          jong
        }
      }
    }
    allFile(
      sort: {fields: base, order: DESC},
      filter: {
        extension: { regex: "/(jpg)|(png)|(jpeg)/" }
        relativeDirectory: { eq: "activities/jong" }
      }
    ) {
      edges {
        node {
          base
          childImageSharp {
            fluid {
              src
            }
          }
        }
      }
    }
  }
`;
//eslint-disable-next-line no-undef
