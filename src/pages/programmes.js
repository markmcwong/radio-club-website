import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";

require("core-js/fn/array/find");

import Article from "../components/Article";
import Search from "../components/Search";
import { ThemeContext } from "../layouts";
import Seo from "../components/Seo";
import newsTeamImage from "../images/jpg/20gb.jpg";

import AlgoliaIcon from "!svg-react-loader!../images/svg-icons/search-by-algolia.svg?name=AlgoliaLogo";
import { Col, Container, Div, Text, Row, Image } from "atomize";


const ProgrammesPage = props => {

  return (
    <React.Fragment>
      <Div bg="warning500">
        <Row h="100vh" p={{ b: "10vh", t: "10vh", x: { xl: "4vw", lg: "2vw" } }}>
          <Text pos="absolute" tag="p" textWeight="300" textSize="title" p={{l:"2.5%"}}>
            ←Back
          </Text>
          <Col size="4" p="2.5%" d="flex" align="center">
              <Image shadow="4" src={newsTeamImage} style={{zIndex: 2}}/>
          </Col>
          <Col shadow="5" style={{marginLeft: "-15vw",
            paddingLeft: "15vw",
            maxWidth: "80%",
            flex: "0 1 80%"}} d="flex" align="center" flexDir="row" size="8" bg="white">
            <Col h="100%" size="7" d="flex" align="center" p={{ t: "2.5%", l: { xl: "3vw", lg: "2vw" } }}>
              <div>
                <Text tag="h1" textSize="display3" p={{ t: "10px" }}>
                  General Broadcasting
                </Text>
                <Text tag="h6" textSize="display1" p={{ t: "30px" }}>
                  Date & Time
                </Text>
                <Text tag="p" textWeight="200" textSize="title" p={{ t: "20px" }}>
                  19th March 2019 - 2rd May 2019, 19:30 - 22:30
                </Text>
                <Text tag="h6" textSize="display1" p={{ t: "30px" }}>
                  Venue
                </Text>
                <Text tag="p" textWeight="200" textSize="title" p={{ t: "20px" }}>
                  Room LG5208 Activity Room
                </Text>
              </div>
            </Col>
            <Col shadow="5" h="80vh" size="5"  overflow="scroll" style={{overflowX: "hidden"}}>
              <Div shadow="3" m="5px" d="flex" flexDir="row" p={{y:"10px"}}>
                <Col size="3" align="center" d="flex" flexDir="row">
                  <Image h="5" shadow="5" style={{objectFit: "cover", zIndex: 2}} src={newsTeamImage}/>
                </Col>
                <Col size="8" align="center"  d="flex" flexDir="row">
                  <Div>
                    <Text textWeight="200" tag="h6" textSize="subheader" p={{ l:"20px"}}>
                      General Broadcasting
                    </Text>
                    <Text textColor="info600" textWeight="300" tag="h6" textSize="subheader" p={{ l:"20px", t: "5px" }}>
                      2019 - Rhapsody
                    </Text>
                  </Div>
                </Col>
              </Div>
              <Div shadow="3" m="5px" d="flex" flexDir="row" p={{y:"10px"}}>
                <Col size="3" align="center" d="flex" flexDir="row">
                  <Image h="5" shadow="5" style={{objectFit: "cover", zIndex: 2}} src={newsTeamImage}/>
                </Col>
                <Col size="8" align="center"  d="flex" flexDir="row">
                  <Div>
                    <Text textWeight="200" tag="h6" textSize="subheader" p={{ l:"20px"}}>
                      General Broadcasting
                    </Text>
                    <Text textColor="info600" textWeight="300" tag="h6" textSize="subheader" p={{ l:"20px", t: "5px" }}>
                      2019
                    </Text>
                  </Div>
                </Col>
              </Div>
              <Div shadow="3" m="5px" d="flex" flexDir="row" p={{y:"10px"}}>
                <Col size="3" align="center" d="flex" flexDir="row">
                  <Image h="5" shadow="5" style={{objectFit: "cover", zIndex: 2}} src={newsTeamImage}/>
                </Col>
                <Col size="8" align="center"  d="flex" flexDir="row">
                  <Div>
                    <Text textWeight="200" tag="h6" textSize="subheader" p={{ l:"20px"}}>
                      General Broadcasting
                    </Text>
                    <Text textColor="info600" textWeight="300" tag="h6" textSize="subheader" p={{ l:"20px", t: "5px" }}>
                      2019
                    </Text>
                  </Div>
                </Col>
              </Div>
              <Div shadow="3" m="5px" d="flex" flexDir="row" p={{y:"10px"}}>
                <Col size="3" align="center" d="flex" flexDir="row">
                  <Image h="5" shadow="5" style={{objectFit: "cover", zIndex: 2}} src={newsTeamImage}/>
                </Col>
                <Col size="8" align="center"  d="flex" flexDir="row">
                  <Div>
                    <Text textWeight="200" tag="h6" textSize="subheader" p={{ l:"20px"}}>
                      General Broadcasting
                    </Text>
                    <Text textColor="info600" textWeight="300" tag="h6" textSize="subheader" p={{ l:"20px", t: "5px" }}>
                      2019
                    </Text>
                  </Div>
                </Col>
              </Div>
              <Div shadow="3" m="5px" d="flex" flexDir="row" p={{y:"10px"}}>
                <Col size="3" align="center" d="flex" flexDir="row">
                  <Image h="5" shadow="5" style={{objectFit: "cover", zIndex: 2}} src={newsTeamImage}/>
                </Col>
                <Col size="8" align="center"  d="flex" flexDir="row">
                  <Div>
                    <Text textWeight="200" tag="h6" textSize="subheader" p={{ l:"20px"}}>
                      General Broadcasting
                    </Text>
                    <Text textColor="info600" textWeight="300" tag="h6" textSize="subheader" p={{ l:"20px", t: "5px" }}>
                      2019
                    </Text>
                  </Div>
                </Col>
              </Div>
              <Div shadow="3" m="5px" d="flex" flexDir="row" p={{y:"10px"}}>
                <Col size="3" align="center" d="flex" flexDir="row">
                  <Image h="5" shadow="5" style={{objectFit: "cover", zIndex: 2}} src={newsTeamImage}/>
                </Col>
                <Col size="8" align="center"  d="flex" flexDir="row">
                  <Div>
                    <Text textWeight="200" tag="h6" textSize="subheader" p={{ l:"20px"}}>
                      General Broadcasting
                    </Text>
                    <Text textColor="info600" textWeight="300" tag="h6" textSize="subheader" p={{ l:"20px", t: "5px" }}>
                      2019
                    </Text>
                  </Div>
                </Col>
              </Div>
              <Div shadow="3" m="5px" d="flex" flexDir="row" p={{y:"10px"}}>
                <Col size="3" align="center" d="flex" flexDir="row">
                  <Image h="5" shadow="5" style={{objectFit: "cover", zIndex: 2}} src={newsTeamImage}/>
                </Col>
                <Col size="8" align="center"  d="flex" flexDir="row">
                  <Div>
                    <Text textWeight="200" tag="h6" textSize="subheader" p={{ l:"20px"}}>
                      General Broadcasting
                    </Text>
                    <Text textColor="info600" textWeight="300" tag="h6" textSize="subheader" p={{ l:"20px", t: "5px" }}>
                      2019
                    </Text>
                  </Div>
                </Col>
              </Div>
            </Col>
          </Col>
        </Row>
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

//eslint-disable-next-line no-undef
