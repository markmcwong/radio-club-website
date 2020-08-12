import PropTypes from "prop-types";
import React, { useState } from "react";
import { graphq, navigate, Link } from "gatsby";


// import TestPage from "../components/demo"
import { Dropdown, Col, Container, Div, Text, Row, Image, Button, Icon } from "atomize";
import placeholder from "../images/png/placeholder.png";
import { motion, useAnimation } from "framer-motion";
import window from "global";

const ProgrammesPage = props => {
  const smallScreen = (window.innerWidth > 800);
  const menuList = (
    <Div>
      {["General Broadcasting", "New Star Hit", "Radio Drama", "Interviews / Special"].map((name, index) => (
        <Div d="block" p="0.5rem" onClick={() =>
          setFilter(name)}>
          {name}
        </Div>
      ))}
    </Div>
  );
  const {
    data: {
      allProgrammesJson: { edges: programmes = [] }
    }
  } = props;
  const nav = (year, type) => {
    console.log(year)
    navigate(
      "/demo/",
      // highlight-start
      {
        state: {dateFilter: year, typeFilter: type}
      }
      // highlight-end
    );
  };
  const tabNames = ["Any Programmes", "General Broadcasting", "New Star Hit", "Interviews / Special", "Radio Drama"];
  const setCurrentProgramme = (index) => {
    if(index < 0) index = 4
    if(index > 4) index = 0
    const old = active;
    if (old != index) {
      setActive(index);
      gbControls.start({
        width: (index == 1) ? ["5vw", (smallScreen) ? "60vw" : "100vw"] : ((smallScreen) ?  "5vw": "0vw"),
        marginTop: (index == 1) ? [50 * (1 - old), "0"] : Math.abs(50 * (1 - index)),
        padding: (index == 1) ? "50px" : "0px",
        transition: { duration: 1, times: [0, 1] }
      });
      pastProgrammesControls.start({
        width: (index == 0) ? ["5vw", (smallScreen) ? "60vw" : "100vw"] : ((smallScreen) ? "5vw": "0vw"),
        marginTop: [Math.abs(50 * (0 - old)), Math.abs(50 * (0 - index))],
        marginLeft: (index == 0) ? 0 : ["0vw", "-" + 5 * ((smallScreen) ? index : 0 ) + "vw"],
        transition: { duration: 1, times: [0, 1] },
        padding: (index == 0) ? "50px" : "0px"
      });
      nshControls.start({
        width: (index == 2) ? ["5vw", (smallScreen) ? "60vw" : "100vw"] : ((smallScreen) ? "5vw": "0vw"),
        marginTop: [Math.abs(50 * (2 - old)), Math.abs(50 * (2 - index))],
        padding: (index == 2) ? "50px" : "0px",
        transition: { duration: 1, times: [0, 1] }
      });
      interviewControls.start({
        width: (index == 3) ? ["5vw", (smallScreen) ? "60vw" : "100vw"] : ((smallScreen) ? "5vw": "0vw"),
        marginTop: [Math.abs(50 * (3 - old)), Math.abs(50 * (3 - index))],
        padding: (index == 3) ? "50px" : "0px",
        transition: { duration: 1, times: [0, 1] }
      });
      dramaControls.start({
        width: (index == 4) ? ["5vw", (smallScreen) ? "60vw" : "100vw"] : ((smallScreen) ? "5vw": "0vw"),
        marginTop: [Math.abs(50 * (4 - old)), Math.abs(50 * (4 - index))],
        padding: (index == 4) ? "50px" : "0px",
        transition: { duration: 1, times: [0, 1] }
      });
      setFilter(tabNames[index]);
    }
  };
  const gbControls = useAnimation();
  const pastProgrammesControls = useAnimation();
  const nshControls = useAnimation();
  const interviewControls = useAnimation();
  const dramaControls = useAnimation();

  const [filter, setFilter] = useState("Any Programmes");
  const [dropDown, showDropDown] = useState(false);
  const [catDown, showCatDown] = useState(false);
  const [active, setActive] = useState(0);
  return (
    <React.Fragment>
      <Div bg="warning100">
        <Col p={{ b: "10vh", t: "10vh", x: {xl: "5vw", lg: "2vw" } }}>
          {/*<TestPage style={{height: "100vh", width: "100vw", zIndex: 200}}/>*/}
          <Row p={{ x:{xs: "10vw", lg: 0}}}>
            <Div cursor="pointer" tag="h1" textSize="6vw" p={{ t: "10px" }}>
              Programmes
            </Div>
          </Row>

          <Row p={{ x:{xs: "10vw", lg: 0}, y: "5vh" }}>
            <Col size={{ xs: "12", lg: "3" }}>
              <Dropdown style={{
                background: "transparent",
                borderRadius: 0,
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none"
              }}
                        isOpen={dropDown}
                        onClick={() =>
                          showDropDown(!dropDown)
                        }
                        menu={menuList}
              >
                {filter}
              </Dropdown>
            </Col>
            <Col size={{ xs: "12", lg: "3" }}>
              <Dropdown style={{
                background: "transparent",
                borderRadius: 0,
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none"
              }}
                        isOpen={catDown}
                        onClick={() =>
                          showCatDown(!catDown)
                        }
                        menu={menuList}
              >
                2019-2020
              </Dropdown>
            </Col>
            <Col d="flex" p={{t: { xs: "2rem", lg: "0" }}}>
              <Button
                h="2.5rem"
                w="2.5rem"
                bg="success700"
                hoverBg="success600"
                rounded="circle"
                m={{ r: "1rem" }}
                shadow="2"
                hoverShadow="4"
                onClick={()=> setCurrentProgramme(active-1)}
              >
                <Icon name="LeftArrow" size="20px" color="white"/>
              </Button>
              <Button
                h="2.5rem"
                w="2.5rem"
                bg="success700"
                hoverBg="success600"
                rounded="circle"
                m={{ r: "1rem" }}
                shadow="2"
                hoverShadow="4"
                onClick={()=> setCurrentProgramme(active+1)}
              >
                <Icon name="RightArrow" size="20px" color="white"/>
              </Button>
            </Col>
          </Row>
          <Row>
            <motion.div onClick={() => setCurrentProgramme(0)}
                        style={{ backgroundColor: "rgb(225, 228, 232)", padding: "50px", margin: { xs: "-10vw", lg: "0vw" }, width: {xs: "100vw", lg: "60vw" } }}
                        animate={pastProgrammesControls}>
              {active != 0 && smallScreen &&
              <Div align="center" flexDir="column" d="flex">
                <Text p={{ t: "40px" }} textSize="display1" textWeight="300"
                      style={{ writingMode: "vertical-rl", textOrientation: "sideways" }}>
                  Past Programmes
                </Text>
              </Div>
              }
              {active == 0 && <Div>
                <Text tag="h1" textSize="subheader" textWeight="400" p={{ t: "10px" }}>
                  Rewind
                </Text>
                <Text tag="h1" textSize="6vw" p={{ t: "10px", b: "30px" }}>
                  {filter === "" && "Past Programmes"}
                  {filter}
                </Text>
                <Div>
                  <Row p={{ b: "10px" }} style={{ borderBottom: "1px solid" }}>
                    <Col size="4">
                      <Text tag="h1" textWeight="400" textSize="paragraph" p={{ t: "10px" }}>
                        Date
                      </Text>
                    </Col>
                    <Col size="8">
                      <Text tag="h1" textWeight="400" textSize="paragraph" p={{ t: "10px" }}>
                        Programme Name
                      </Text>
                    </Col>
                  </Row>
                  {programmes.map(jong => {
                    // tests.map(test => {});
                    const {
                      node,
                      node: { name, date, type, year }
                    } = jong;

                    if (type === filter || filter === "Any Programmes") {
                      return (
                        <Row onClick={() => nav(year, type)} p={{ y: "25px" }} style={{ borderBottom: "1px solid" }}>
                          <Col size="4">
                            <Text tag="h1" textSize="display1">
                              {date}
                            </Text>
                          </Col>
                          <Col size="8">
                            <Text tag="h1" textSize="display1">
                              {name}
                            </Text>
                          </Col>
                        </Row>
                      );
                    }
                  })}
                </Div>
              </Div>}
            </motion.div>
            <motion.div style={{
              marginTop: "50px",
              verticalAlign: "bottom",
              width: "5vw",
              backgroundColor: "rgb(251, 224, 161)"
            }} animate={gbControls}>
              <Div cursor="pointer" onClick={() => setCurrentProgramme(1)} h="100%" align="center"
                   flexDir="column" d="flex">
                {active != 1 &&
                <Text p={{ t: "40px" }} textSize="display1" textWeight="300"
                      style={{ writingMode: "vertical-rl", textOrientation: "sideways" }}>
                  {smallScreen &&
                  <>
                    General Broadcasting
                  </>
                  }
                </Text>
                }
                {active == 1 &&
                <Div>
                  <Text tag="h1" textSize="subheader" textWeight="400" p={{ t: "10px" }}>
                    Rewind
                  </Text>
                  <Text tag="h1" textSize="6vw" p={{ t: "10px", b: "30px" }}>
                    General Broadcasting
                  </Text>
                  <Div>
                    <Row p={{ b: "10px" }} style={{ borderBottom: "1px solid" }}>
                      <Col size="4">
                        <Text tag="h1" textWeight="400" textSize="paragraph" p={{ t: "10px" }}>
                          Date
                        </Text>
                      </Col>
                      <Col size="8">
                        <Text tag="h1" textWeight="400" textSize="paragraph" p={{ t: "10px" }}>
                          Programme Name
                        </Text>
                      </Col>
                    </Row>
                    {programmes.map(jong => {
                      // tests.map(test => {});
                      const {
                        node,
                        node: { name, date, type, year }
                      } = jong;

                      if (type === "General Broadcasting") {
                        return (
                          <Row onClick={() => nav(year, type)} p={{ y: "25px" }} style={{ borderBottom: "1px solid" }}>
                            <Col size="4">
                              <Text tag="h1" textSize="display1">
                                {date}
                              </Text>
                            </Col>
                            <Col size="8">
                              <Text tag="h1" textSize="display1">
                                {name}
                              </Text>
                            </Col>
                          </Row>
                        );
                      }
                    })}
                  </Div>
                </Div>
                }
              </Div>
            </motion.div>
            <motion.div style={{
              marginTop: "100px",
              verticalAlign: "bottom",
              width: "5vw",
              backgroundColor: "rgb(220, 238, 255)"
            }} animate={nshControls}>
              <Div cursor="pointer" onClick={() => setCurrentProgramme(2)} h="100%" align="center"
                   flexDir="column" d="flex">
                {active != 2 && !smallScreen &&
                <Text p={{ t: "40px" }} textSize="display1" textWeight="300"
                      style={{ writingMode: "vertical-rl", textOrientation: "sideways" }}>
                  {smallScreen &&
                  <>
                    New Star Hit
                  </>
                  }
                </Text>
                }
                {active == 2 &&
                <Div>
                  <Text tag="h1" textSize="subheader" textWeight="400" p={{ t: "10px" }}>
                    Rewind
                  </Text>
                  <Text tag="h1" textSize="6vw" p={{ t: "10px", b: "30px" }}>
                    New Star Hit
                  </Text>
                  <Div>
                    <Row p={{ b: "10px" }} style={{ borderBottom: "1px solid" }}>
                      <Col size="4">
                        <Text tag="h1" textWeight="400" textSize="paragraph" p={{ t: "10px" }}>
                          Date
                        </Text>
                      </Col>
                      <Col size="8">
                        <Text tag="h1" textWeight="400" textSize="paragraph" p={{ t: "10px" }}>
                          Programme Name
                        </Text>
                      </Col>
                    </Row>
                    {programmes.map(jong => {
                      // tests.map(test => {});
                      const {
                        node,
                        node: { name, date, type, year }
                      } = jong;

                      if (type === "New Star Hit") {
                        return (
                          <Row onClick={() => nav(year, type)} p={{ y: "25px" }} style={{ borderBottom: "1px solid" }}>
                            <Col size="4">
                              <Text tag="h1" textSize="display1">
                                {date}
                              </Text>
                            </Col>
                            <Col size="8">
                              <Text tag="h1" textSize="display1">
                                {name}
                              </Text>
                            </Col>
                          </Row>
                        );
                      }
                    })}
                  </Div>
                </Div>
                }
              </Div>
            </motion.div>
            <motion.div style={{
              marginTop: "150px",
              verticalAlign: "bottom",
              width: "5vw",
              backgroundColor: "rgb(234, 247, 241)"
            }} animate={interviewControls}>
              <Div cursor="pointer" onClick={() => setCurrentProgramme(3)} h="100%" align="center"
                   flexDir="column" d="flex">
                {active != 3 && !smallScreen &&
                <Text p={{ t: "40px" }} textSize="display1" textWeight="300"
                      style={{ writingMode: "vertical-rl", textOrientation: "sideways" }}>
                  {smallScreen &&
                  <>
                    Interviews / Special
                  </>
                  }
                </Text>
                }
                {active == 3 &&
                <Div>
                  <Text tag="h1" textSize="subheader" textWeight="400" p={{ t: "10px" }}>
                    Rewind
                  </Text>
                  <Text tag="h1" textSize="6vw" p={{ t: "10px", b: "30px" }}>
                    Interviews / Special
                  </Text>
                  <Div>
                    <Row p={{ b: "10px" }} style={{ borderBottom: "1px solid" }}>
                      <Col size="4">
                        <Text tag="h1" textWeight="400" textSize="paragraph" p={{ t: "10px" }}>
                          Date
                        </Text>
                      </Col>
                      <Col size="8">
                        <Text tag="h1" textWeight="400" textSize="paragraph" p={{ t: "10px" }}>
                          Programme Name
                        </Text>
                      </Col>
                    </Row>
                    {programmes.map(jong => {
                      // tests.map(test => {});
                      const {
                        node,
                        node: { name, date, type, year }
                      } = jong;

                      if (type === "Interviews / Special") {
                        return (
                          <Row onClick={() => nav(year, type)} p={{ y: "25px" }} style={{ borderBottom: "1px solid" }}>
                            <Col size="4">
                              <Text tag="h1" textSize="display1">
                                {date}
                              </Text>
                            </Col>
                            <Col size="8">
                              <Text tag="h1" textSize="display1">
                                {name}
                              </Text>
                            </Col>
                          </Row>
                        );
                      }
                    })}
                  </Div>
                </Div>
                }
              </Div>
            </motion.div>
            <motion.div style={{
              marginTop: "200px",
              verticalAlign: "bottom",
              width: "5vw",
              backgroundColor: "rgb(253, 232, 225)"
            }} animate={dramaControls}>
              <Div cursor="pointer" onClick={() => setCurrentProgramme(4)} h="100%" align="center"
                   flexDir="column" d="flex">
                {active != 4 && !smallScreen &&
                <Text p={{ t: "40px" }} textSize="display1" textWeight="300"
                      style={{ writingMode: "vertical-rl", textOrientation: "sideways" }}>
                  {smallScreen &&
                  <>
                    Radio Drama
                  </>
                  }
                </Text>
                }
                {active == 4 &&
                <Div>
                  <Text tag="h1" textSize="subheader" textWeight="400" p={{ t: "10px" }}>
                    Rewind
                  </Text>
                  <Text tag="h1" textSize="6vw" p={{ t: "10px", b: "30px" }}>
                    Radio Drama
                  </Text>
                  <Div>
                    <Row p={{ b: "10px" }} style={{ borderBottom: "1px solid" }}>
                      <Col size="4">
                        <Text tag="h1" textWeight="400" textSize="paragraph" p={{ t: "10px" }}>
                          Date
                        </Text>
                      </Col>
                      <Col size="8">
                        <Text tag="h1" textWeight="400" textSize="paragraph" p={{ t: "10px" }}>
                          Programme Name
                        </Text>
                      </Col>
                    </Row>
                    {programmes.map(jong => {
                      // tests.map(test => {});
                      const {
                        node,
                        node: { name, date, type, year }
                      } = jong;

                      if (type === "Radio Drama") {
                        return (
                          <Row onClick={() => nav(year, type)} p={{ y: "25px" }} style={{ borderBottom: "1px solid" }}>
                            <Col size="4">
                              <Text tag="h1" textSize="display1">
                                {date}
                              </Text>
                            </Col>
                            <Col size="8">
                              <Text tag="h1" textSize="display1">
                                {name}
                              </Text>
                            </Col>
                          </Row>
                        );
                      }
                    })}
                  </Div>
                </Div>
                }
              </Div>
            </motion.div>
          </Row>


        </Col>

      </Div>
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
    </React.Fragment>
  );
};

ProgrammesPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default ProgrammesPage;
export const query = graphql`
  query ProgrammesQuery {
    allProgrammesJson {
      edges {
        node {
          name
          date
          type
          year
        }
      }
    }
  }
`;
//eslint-disable-next-line no-undef
