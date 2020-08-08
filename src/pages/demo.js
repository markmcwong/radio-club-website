import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import { Button, Col, Div, Icon, Image, Row, Text, ThemeProvider } from "atomize";
import newsTeamImage from "../images/jpg/20gb.jpg";
import { motion } from "framer-motion";


const TestPage = props => {
  const Name = "test";
  let {
    location: {
      state: {
        dateFilter,
        nameFilter,
        typeFilter
      }
    },
    data: {
      allNshJson: { edges: nshs = [] },
      allLbJson: { edges: lbs = [] },
      allFile: { edges: files = [] },
      allGbJson: {edges: gbs = []}
    }
  } = props;

  const theme = {
    grid: {
      colCount: 13,
      gutterWidth: 0
    },
    shadows: {
      "new-shadow": "5px 0px 24px 5px rgba(0, 0, 0, 0.08)"
    }
  };

  const { subtitle1, content1, subtitle2, content2, subtitle3, content3, link, tuesday, wednesday, thursday, timeslot, year, name, date } = (typeFilter == "New Star Hit" && nshs.filter(nsh => nsh.node.year == dateFilter)[0].node) || (typeFilter == "General Broadcasting" && gbs.filter(gb => gb.node.year == dateFilter)[0].node) || typeFilter == "Interviews / Special" && lbs.filter(lb => lb.node.year == dateFilter)[0].node;

  let filteredImg = files.filter(function(img) {
    console.log(img.node.base);
    return img.node.base.startsWith(name);
  })[0];
  return (
    <React.Fragment>
      <Button
        pos="fixed"
        top="3vh"
        left="2.5%"
        bg="transparent"
        hoverBg="gray300"
        m={{ r: "0.5rem" }}
        onClick={() => location.href = "/programmes/"}
        style={{ zIndex: "200" }}
      >
        <Icon name="LeftArrow" size="40px"/>
      </Button>
      <ThemeProvider theme={theme}>
        {/* --- STYLES --- */}
        <motion.div>
          {(typeFilter == "General Broadcasting" || typeFilter == "New Star Hit") &&
          <>
            <Row p={{ t: "15vh", x: "10vw" }}>
              <Col size="7">
                <Image maxH="500px" w="100%" src={filteredImg.node.childImageSharp.fluid.src}/>
              </Col>
              <Col p={{ l: "2.5vw" }} size="6">
                <Text textSize="5vw">{name}</Text>
                <Text m={{ t: "5vh" }} textSize="subheader">Date</Text>
                <Text textSize="heading">{date}</Text>
              </Col>
            </Row>
            <Row p={{ x: "10vw", y: "5vh" }} w="100%" d="flex" flexDir="row">
              <Col p={{ t: "50px" }} size="1">
                {timeslot && timeslot.map(time => {
                  return <Row h="calc(15vh + 20px)">
                    <Text w="100%" textAlign="center">
                      {time}
                    </Text>
                  </Row>;
                })}
              </Col>
              <Col d="flex" flexDir="column" size="4">
                <Text m="10px">Tuesday</Text>
                {tuesday && tuesday.map(tues => {
                  // tests.map(test => {});
                  const {
                    title, description
                  } = tues;
                  return (
                    <Row d="flex" flexDir="row" shadow="new-shadow" m="10px" rounded="10px">
                      <Col size="4" align="center" d="flex" flexDir="row">
                        <Image
                          h="15vh"
                          w="auto"
                          shadow="5"
                          style={{ objectFit: "cover", zIndex: 2 }}
                          src={newsTeamImage}
                        />
                      </Col>
                      <Col m={{ l: "10" }} size="9" align="center" d="flex" flexDir="row">
                        <Div>
                          <Text textWeight="400" tag="h6" textSize="heading" p={{ l: "20px" }}>
                            {title}
                          </Text>
                          <Text
                            textColor="info600"
                            textWeight="300"
                            tag="h6"
                            textSize="subheader"
                            p={{ l: "20px", t: "5px" }}
                          >
                            View Details
                          </Text>
                        </Div>
                      </Col>
                    </Row>
                  );
                })}
              </Col>
              <Col d="flex" flexDir="column" size="4">
                <Text m="10px">Wednesday</Text>
                {wednesday && wednesday.map(tues => {
                  const {
                    title, description
                  } = tues;
                  return (
                    <Row d="flex" flexDir="row" shadow="new-shadow" m="10px" rounded="10px">
                      <Col size="4" align="center" d="flex" flexDir="row">
                        <Image
                          h="15vh"
                          w="auto"
                          shadow="5"
                          style={{ objectFit: "cover", zIndex: 2 }}
                          src={newsTeamImage}
                        />
                      </Col>
                      <Col m={{ l: "10" }} size="9" align="center" d="flex" flexDir="row">
                        <Div>
                          <Text textWeight="400" tag="h6" textSize="heading" p={{ l: "20px" }}>
                            {title}
                          </Text>
                          <Text
                            textColor="info600"
                            textWeight="300"
                            tag="h6"
                            textSize="subheader"
                            p={{ l: "20px", t: "5px" }}
                          >
                            View Details
                          </Text>
                        </Div>
                      </Col>
                    </Row>
                  );
                })}
              </Col>
              <Col d="flex" flexDir="column" size="4">
                <Text m="10px">Thursday</Text>
                {thursday && thursday.map(tues => {
                  const {
                    title, description
                  } = tues;
                  return (
                    <Row d="flex" flexDir="row" shadow="new-shadow" m="10px" rounded="10px">
                      <Col size="4" align="center" d="flex" flexDir="row">
                        <Image
                          h="15vh"
                          w="auto"
                          shadow="5"
                          style={{ objectFit: "cover", zIndex: 2 }}
                          src={newsTeamImage}
                        />
                      </Col>
                      <Col m={{ l: "10" }} size="9" align="center" d="flex" flexDir="row">
                        <Div>
                          <Text textWeight="400" tag="h6" textSize="heading" p={{ l: "20px" }}>
                            {title}
                          </Text>
                          <Text
                            textColor="info600"
                            textWeight="300"
                            tag="h6"
                            textSize="subheader"
                            p={{ l: "20px", t: "5px" }}
                          >
                            View Details
                          </Text>
                        </Div>
                      </Col>
                    </Row>
                  );
                })}
              </Col>
            </Row>
          </>
          }
          {(typeFilter == "Interviews / Special" || typeFilter == "Radio Drama") &&
          <>
            <Row h="100vh">
              <Col h="100%" w="8">
                <Div m={{r:"-3vw"}} p={{ t: "15vh", l: "6vw", r: "12vw" }} h="100%" bg="info300">
                <Text textSize="4.5vw">{name}</Text>
                <Text m={{ t: "5vh" }} textSize="subheader">{subtitle1}</Text>
                <Text textSize="heading">{content1}</Text>
                <Text m={{ t: "2.5vh" }} textSize="subheader">{subtitle2}</Text>
                <Text textSize="heading">{content2}</Text>
                <Text m={{ t: "2.5vh" }} textSize="subheader">{subtitle3}</Text>
                <Text textSize="heading">{content3}</Text>
                <Text textSize="heading" m={{ t: "2.5vh" }} ><a href={link}>Listen Now →</a> </Text>
                </Div>
              </Col>
              <Col size="5" d="flex" flexDir="row" align="center">
                <Image m={{l:"-7vw"}}  w="115%" src={filteredImg.node.childImageSharp.fluid.src}/>
              </Col>
            </Row>
          </>
          }
        </motion.div>
      </ThemeProvider>
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
  );
};

TestPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default TestPage;
//eslint-disable-next-line no-undef
export const query = graphql`
  query testQuery {
    allFile(
      sort: {fields: base, order: DESC},
      filter: {
        extension: { regex: "/(jpg)|(png)|(jpeg)/" }
        relativeDirectory: { eq: "programmes" }
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
    allNshJson {
      edges {
        node {
          name
          date
          year
          timeslot
          tuesday {
            title
            description
            host
            langauge
            link
            date
          }
          wednesday {
            title
            description
            host
            langauge
            link
            date
          }
          thursday {
            title
            description
            host
            langauge
            link
            date
          }
        }
      }
    }
    allGbJson {
      edges {
        node {
          name
          date
          year
          timeslot
          tuesday {
            title
            description
            host
            langauge
            link
            date
          }
          wednesday {
            title
            description
            host
            langauge
            link
            date
          }
          thursday {
            title
            description
            host
            langauge
            link
            date
          }
        }
      }
    }
    allLbJson {
      edges {
        node {
          name
          subtitle1
          content1
          subtitle2
          content2
          subtitle3
          content3
          link
          year
        }
      }
    }
  }
`;
