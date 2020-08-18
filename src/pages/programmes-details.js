import PropTypes from "prop-types";
import React, { useState } from "react";
import { graphql } from "gatsby";
import { Button, Col, Div, Icon, Image, Row, Text, ThemeProvider, Modal } from "atomize";
import newsTeamImage from "../images/jpg/20gb.jpg";
import { motion } from "framer-motion";
import window from "global";
import placeholder from "../images/png/placeholder.png";

const AlignStartModal = ({ isOpen, onClose, content }) => {
  console.log(content)
  return (
    <Modal isOpen={isOpen} onClose={onClose} align="start" rounded="md">
      <Icon
        name="Cross"
        pos="absolute"
        top="1rem"
        right="1rem"
        size="16px"
        onClick={onClose}
        cursor="pointer"
      />
      <Text p={{ l: "0.5rem", t: "0.25rem" }} textSize="display1">
        {content.topic}
      </Text>
      <Text p={{ l: "0.5rem", t: "0.25rem" }} textSize="subheader">
        {content.description}
      </Text>
      <Text p={{ l: "0.5rem", t: "0.25rem" }} textSize="subheader">
        Hosts: {content.hosts}
      </Text>
      <Text p={{ l: "0.5rem", t: "0.25rem" }} textSize="subheader">
        Language: {content.language}
      </Text>
      <Text p={{ l: "0.5rem", t: "0.25rem" }} textSize="subheader">
        Operator: {content.operator}
      </Text>
      <Div m={{ t: "2rem" }}>
        {content.link && content.link.map((_link, index) => {
          return <>
            <Text p={{ l: "0.5rem", t: "0.25rem" }} textSize="subheader">
              <a href={_link}>Episode {index} : {content.date[index]}</a>
            </Text>
          </>
        })}
      </Div>
      <Div d="flex" justify="flex-end">
        <Button onClick={onClose} bg="info700">
          Done
        </Button>
      </Div>
    </Modal>
  );
};
const TestPage = props => {
  const Name = "test";
  function getState() {
    return {
      dateFilter: props.location.state.dateFilter,
      nameFilter: props.location.state.nameFilter,
      typeFilter: props.location.state.typeFilter
    };
  }
  let dateFilter, typeFilter, nameFilter;

  if (props.location.state) {
    console.log(props.location);
    ({ dateFilter, typeFilter, nameFilter } = getState());
  }
  let {
    data: {
      allNshgbJson: { edges: nshgbs = [] },
      allLbJson: { edges: lbs = [] },
      allFile: { edges: files = [] },
      allDramaJson: { edges: dramas = [] }
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
  const [showModal, setModal] = useState(false);
  const [modalStuff, setModalStuff] = useState({});
  const {
    subtitle1,
    content1,
    subtitle2,
    content2,
    subtitle3,
    content3,
    link,
    tuesday,
    wednesday,
    thursday,
    timeslot,
    year,
    name,
    date
  } =
    (typeFilter == "New Star Hit" &&
      nshgbs.filter(
        nsh => nsh.node.year == dateFilter && nsh.node.name.startsWith("New Star Hit")
      )[0].node) ||
    (typeFilter == "General Broadcasting" &&
      nshgbs.filter(
        gb => gb.node.year == dateFilter && gb.node.name.startsWith("General Broadcasting")
      )[0].node) ||
    (typeFilter == "Interviews / Special" &&
      lbs.filter(lb => lb.node.name == nameFilter && lb.node.year == dateFilter)[0].node) ||
    (typeFilter == "Radio Drama" &&
      dramas.filter(drama => drama.node.name == nameFilter && drama.node.year == dateFilter)[0]
        .node);
  let filteredImg = files.filter(function(img) {
    console.log(img.node.base);
    return img.node.base.startsWith(name);
  })[0];
  let icon = files.filter(function(img) {
    return img.node.base.startsWith(year);
  })[0];
  return (
    <React.Fragment>
      <AlignStartModal isOpen={showModal} content={modalStuff} onClose={() => setModal(false)} />
      <Button
        pos="fixed"
        top="3vh"
        left="2.5%"
        bg="transparent"
        hoverBg="gray300"
        m={{ r: "0.5rem" }}
        onClick={() => (location.href = "/programmes/")}
        style={{ zIndex: "200" }}
      >
        <Icon name="LeftArrow" size="40px" />
      </Button>
      <ThemeProvider theme={theme}>
        {/* --- STYLES --- */}
        <motion.div>
          {(typeFilter == "General Broadcasting" || typeFilter == "New Star Hit") && (
            <>
              <Row p={{ t: { xs: "0vh", lg: "15vh" }, x: "10vw" }}>
                <Col size={{ xs: "13", lg: "7" }}>
                  <Image maxH="500px" w="100%" src={filteredImg.node.childImageSharp.fluid.src} />
                </Col>
                <Col p={{ l: "2.5vw" }} size={{ xs: "13", lg: "6" }}>
                  <Text m={{ t: { xs: "2vh", lg: "0vh" } }} textSize="5vw">
                    {name}
                  </Text>
                  <Text m={{ t: { xs: "2vh", lg: "5vh" } }} textSize="subheader">
                    Date
                  </Text>
                  <Text textSize="heading">{date}</Text>
                </Col>
              </Row>
              <Row p={{ x: "10vw", y: "5vh" }} w="100%" d="flex" flexDir="row">
                <Col d="flex" flexDir="column" size={{ xs: "13", lg: "4" }}>
                  <Text p={{ l: "4vw" }} m="10px">
                    Tuesday
                  </Text>
                  {tuesday &&
                    tuesday.map((tues, i) => {
                      // tests.map(test => {});
                      const { topic, description } = tues;
                      return (
                        <Row d="flex" flexDir="row" m="10px" rounded="10px">
                          {window.innerWidth > 800 && (
                            <Col flexDir="row" size="2" d="flex" p={{ r: "10px" }}>
                              {timeslot && (
                                <Text w="100%" m="auto" textAlign="center">
                                  {timeslot[i]}
                                </Text>
                              )}
                            </Col>
                          )}
                          <Col
                            shadow="new-shadow"
                            m={{ l: "10px" }}
                            size="4"
                            align="center"
                            d="flex"
                            flexDir="row"
                          >
                            <Image
                              h="auto"
                              w="100%"
                              shadow="5"
                              style={{ objectFit: "cover", zIndex: 2 }}
                              src={(icon && icon.node.childImageSharp.fluid.src) || placeholder}
                            />
                          </Col>
                          <Col
                            shadow="new-shadow"
                            m={{ l: "10" }}
                            size={{ xs: "9", lg: "7" }}
                            align="center"
                            d="flex"
                            flexDir="row"
                            rounded="10px"
                          >
                            <Div>
                              <Text
                                textWeight="400"
                                tag="h6"
                                textSize={{
                                  xs: "body",
                                  sm: "paragraph",
                                  md: "subheader",
                                  lg: "subheader",
                                  xl: "title"
                                }}
                                p={{ l: "20px" }}
                              >
                                {topic}
                              </Text>
                              <Text
                                textColor="info600"
                                textWeight="300"
                                tag="h6"
                                textSize={{
                                  xs: "body",
                                  sm: "paragraph",
                                  md: "subheader",
                                  lg: "subheader",
                                  xl: "title"
                                }}
                                p={{ l: "20px", t: "5px" }}
                                onClick={() => {setModalStuff(tues); setModal(true)}}
                              >
                                View Details
                              </Text>
                            </Div>
                          </Col>
                        </Row>
                      );
                    })}
                </Col>
                <Col d="flex" flexDir="column" size={{ xs: "13", lg: "4" }}>
                  <Text m="10px">Wednesday</Text>
                  {wednesday &&
                    wednesday.map(tues => {
                      const { topic, description } = tues;
                      return (
                        <Row d="flex" flexDir="row" shadow="new-shadow" m="10px" rounded="10px">
                          <Col size="4" align="center" d="flex" flexDir="row">
                            <Image
                              h="auto"
                              w="100%"
                              shadow="5"
                              style={{ objectFit: "cover", zIndex: 2 }}
                              src={(icon && icon.node.childImageSharp.fluid.src) || placeholder}
                            />
                          </Col>
                          <Col m={{ l: "10" }} size="9" align="center" d="flex" flexDir="row">
                            <Div>
                              <Text
                                textWeight="400"
                                tag="h6"
                                textSize={{
                                  xs: "body",
                                  sm: "paragraph",
                                  md: "subheader",
                                  lg: "subheader",
                                  xl: "title"
                                }}
                                p={{ l: "20px" }}
                              >
                                {topic}
                              </Text>
                              <Text
                                textColor="info600"
                                textWeight="300"
                                tag="h6"
                                textSize={{
                                  xs: "body",
                                  sm: "paragraph",
                                  md: "subheader",
                                  lg: "subheader",
                                  xl: "title"
                                }}
                                p={{ l: "20px", t: "5px" }}
                                onClick={() => {setModalStuff(tues); setModal(true)}}
                              >
                                View Details
                              </Text>
                            </Div>
                          </Col>
                        </Row>
                      );
                    })}
                </Col>
                <Col d="flex" flexDir="column" size={{ xs: "13", lg: "4" }}>
                  <Text m="10px">Thursday</Text>
                  {thursday &&
                    thursday.map(tues => {
                      const { topic, description } = tues;
                      return (
                        <Row d="flex" flexDir="row" shadow="new-shadow" m="10px" rounded="10px">
                          <Col size="4" align="center" d="flex" flexDir="row">
                            <Image
                              h="auto"
                              w="100%"
                              shadow="5"
                              style={{ objectFit: "cover", zIndex: 2 }}
                              src={(icon && icon.node.childImageSharp.fluid.src) || placeholder}
                            />
                          </Col>
                          <Col
                            m={{ l: "10", t: "5vh" }}
                            size="9"
                            align="center"
                            d="flex"
                            flexDir="row"
                          >
                            <Div>
                              <Text
                                textWeight="400"
                                tag="h6"
                                textSize={{
                                  xs: "body",
                                  sm: "paragraph",
                                  md: "subheader",
                                  lg: "subheader",
                                  xl: "title"
                                }}
                                p={{ l: "20px" }}
                              >
                                {topic}
                              </Text>
                              <Text
                                textColor="info600"
                                textWeight="300"
                                tag="h6"
                                textSize={{
                                  xs: "body",
                                  sm: "paragraph",
                                  md: "subheader",
                                  lg: "subheader",
                                  xl: "title"
                                }}
                                p={{ l: "20px", t: "5px" }}
                                onClick={() => {setModalStuff(tues); setModal(true)}}
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
          )}
          {(typeFilter == "Interviews / Special" || typeFilter == "Radio Drama") && (
            <>
              <Row h="100vh">
                <Col h="100%" order={{ xs: 2, lg: 1 }} size={{xs:"13", lg:"8"}}>
                  <Div
                    m={{ r: "-3vw" }}
                    p={{ t: {xs: "5vh", lg:"15vh"}, l: "6vw", r: "12vw" }}
                    h="100%"
                    bg="info300"
                  >
                    <Text textSize={{xs:"subheader", sm:"subheader", md:"title", lg:"4.5vw"}} >{name}</Text>
                    <Text m={{ t: "5vh" }} textSize="subheader">
                      {subtitle1}
                    </Text>
                    <Text textSize={{xs:"parapgrah", sm:"subheader", md:"subheader", lg:"title",xl:"title"}}>{content1}</Text>
                    <Text m={{ t: "2.5vh" }} textSize="subheader">
                      {subtitle2}
                    </Text>
                    <Text textSize={{xs:"parapgrah", sm:"subheader", md:"subheader", lg:"title",xl:"title"}}>{content2}</Text>
                    <Text m={{ t: "2.5vh" }} textSize="subheader">
                      {subtitle3}
                    </Text>
                    <Text textSize={{xs:"parapgrah", sm:"subheader", md:"subheader", lg:"title",xl:"title"}}>{content3}</Text>
                    <Text textSize="heading" m={{ t: "2.5vh" }}>
                      {link &&
                        link.map((links, i) => {
                          return (
                            <a href={links}>
                              {" "}
                              Listen Part {i + 1} →<br />
                            </a>
                          );
                        })}
                    </Text>
                  </Div>
                </Col>
                <Col size={{xs:"13", lg:"5"}} order={{ xs: 1, lg: 2 }} d="flex" flexDir="row" align="center">
                  <Image
                    m={{ l: "-7vw" }}
                    w={(filteredImg && "115%") || "85%"}
                    src={(filteredImg && filteredImg.node.childImageSharp.fluid.src) || placeholder}
                  />
                </Col>
              </Row>
            </>
          )}
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
      sort: { fields: base, order: DESC }
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
    allNshgbJson {
      edges {
        node {
          name
          date
          year
          timeslot
          tuesday {
            topic
            description
            hosts
            language
            link
            date
          }
          wednesday {
            topic
            description
            hosts
            language
            link
            date
          }
          thursday {
            topic
            description
            hosts
            language
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
    allDramaJson {
      edges {
        node {
          name
          description
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
