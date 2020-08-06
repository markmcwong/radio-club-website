import PropTypes from "prop-types";
import React, { useState } from "react";
import { graphql } from "gatsby";

require("core-js/fn/array/find");

import { Dropdown, Col, Container, Div, Text, Row, Image, Button, Icon } from "atomize";
import placeholder from "../images/png/placeholder.png";

const ProgrammesPage = props => {
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
  const [filter, setFilter] = useState("");
  const [dropDown, showDropDown] = useState(false);
  const [catDown, showCatDown] = useState(false);
  return (
    <React.Fragment>
      <Div bg="warning100">
        <Col p={{ b: "10vh", t: "10vh", x: { xl: "4vw", lg: "2vw" } }}>
          <Row>
            <Div cursor="pointer" tag="h1" textSize="6vw" p={{ t: "10px" }}>
              Programmes
            </Div>
          </Row>

          <Row p={{ y: "5vh" } }>
            <Col size="3">
              <Dropdown style={{background: "transparent", borderRadius: 0, borderTop: "none", borderLeft: "none", borderRight: "none"}}
                isOpen={dropDown}
                onClick={() =>
                  showDropDown(!dropDown)
                }
                menu={menuList}
              >
                Any Programme
              </Dropdown>
            </Col>
            <Col size="3">
              <Dropdown style={{background: "transparent", borderRadius: 0, borderTop: "none", borderLeft: "none", borderRight: "none"}}
                isOpen={catDown}
                onClick={() =>
                  showCatDown(!catDown)
                }
                menu={menuList}
              >
                2019-2020
              </Dropdown>
            </Col>
            <Col d="flex">
              <Button
                h="2.5rem"
                w="2.5rem"
                bg="success700"
                hoverBg="success600"
                rounded="circle"
                m={{ r: "1rem" }}
                shadow="2"
                hoverShadow="4"
              >
                <Icon name="LeftArrow" size="20px" color="white" />
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
              >
                <Icon name="RightArrow" size="20px" color="white" />
              </Button>
            </Col>
          </Row>
          <Row>
            <Col bg="gray400" p="5vh" size="8" minW="700px">
              <Div>
                <Text tag="h1" textSize="subheader" textWeight="400" p={{ t: "10px" }}>
                  Rewind
                </Text>
                <Text tag="h1" textSize="6vw" p={{ t: "10px", b: "30px" }}>
                  {filter === "" && "Past Programmes"}
                  {filter}
                </Text>
                <Div>
                  <Row p={{b:"10px"}} style={{borderBottom: "1px solid"}}>
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
                      node: { name, date, type }
                    } = jong;

                    if(type === filter || filter === ""){
                      return (
                        <Row p={{y:"25px"}} style={{borderBottom: "1px solid"}}>
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
            </Col>
            <Div w="5%" p={{t:"50px"}} style={{ verticalAlign: "bottom" }}>
              <Div bg="warning500" h="100%" align="center" flexDir="column" d="flex">
                <Text p={{t:"40px"}} textSize="display1" textWeight="300" style={{writingMode: "vertical-rl", textOrientation: "sideways"}}>
                  General Broadcasting
                </Text>
              </Div>
            </Div>
            <Div w="5%" p={{t:"100px"}} style={{ verticalAlign: "bottom" }}>
              <Div bg="info300" h="100%" align="center" flexDir="column" d="flex">
                <Text p={{t:"40px"}} textSize="display1" textWeight="300" style={{writingMode: "vertical-rl", textOrientation: "sideways"}}>
                  Interviews / Special
                </Text>
              </Div>
            </Div>
            <Div w="5%" p={{t:"150px"}} style={{ verticalAlign: "bottom" }}>
              <Div bg="danger300" h="100%" align="center" flexDir="column" d="flex">
                <Text p={{t:"40px"}} textSize="display1" textWeight="300" style={{writingMode: "vertical-rl", textOrientation: "sideways"}}>
                  Radio Drama
                </Text>
              </Div>
            </Div>
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
        }
      }
    }
  }
`;
//eslint-disable-next-line no-undef
