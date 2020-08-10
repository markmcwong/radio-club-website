import { FaTag } from "react-icons/fa/";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { graphql } from "gatsby";
import { ThemeContext } from "../layouts";
import Article from "../components/Article/";
import Headline from "../components/Article/Headline";
import List from "../components/List";
import Seo from "../components/Seo";
import { Icon, Col, Container, Button, Div, Text, Row, Image, SideDrawer } from "atomize";
import AnimatedText from "../components/Page/animatedText";
import placeholder from "../images/png/placeholder.png";
import newsTeamImage from "../images/jpg/news_reporting_team.jpeg";
import aboutUsImage from "../images/jpg/aboutUs.jpg";

import AnimatedImage from "../components/Page/animatedImage";
import { motion, useAnimation } from "framer-motion";

const CategoryPage = props => {
  const {
    data: {
      posts: { edges: posts },
      site: {
        siteMetadata: { facebook }
      }
    }
  } = props;

  // Create category list
  const categories = {};
  posts.forEach(edge => {
    const {
      node: {
        frontmatter: { category }
      }
    } = edge;

    if (category && category != null) {
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(edge);
    }
  });
  const BasicSideDrawer = ({ isOpen, onClose }) => {
    return (
      <ThemeContext.Consumer>
        {theme => (
          <SideDrawer isOpen={isOpen} onClose={onClose} w={{ xs: "100vw", md: "40rem" }}>
        <Div d="flex" justify="flex-end">
          <Article theme={theme}>
              <header>
                <Headline title="About Us" theme={theme} />
              </header>
              {categoryList.map(item => (
                <section key={item[0]}>
                  <h2>
                    <FaTag /> {item[0]}
                  </h2>
                  <List edges={item[1]} theme={theme} />
                </section>
              ))}
              {/* --- STYLES --- */}
              <style jsx>{`
            h2 {
              margin: 0 0 0.5em;
            }
            h2 :global(svg) {
              height: 0.8em;
              fill: ${theme.color.brand.primary};
            }
          `}</style>
            </Article>
          <Button
            onClick={onClose}
            hoverBg="gray200"
            bg="transparent"
            textColor="medium"
            m={{ r: "1rem" }}
          >
            <Icon name="Cross" size="30px" />
          </Button>
        </Div>
      </SideDrawer>
        )}
      </ThemeContext.Consumer>
    );
  };
  const categoryList = [];
  const img = (
    <Image src={newsTeamImage}/>
  );
  for (var key in categories) {
    categoryList.push([key, categories[key]]);
  }
  const [showSideDrawer, setSideDrawer] = useState(false);
  return (
    <React.Fragment>
          <div>
            <Button
              pos="fixed"
              top="10px"
              left="2.5%"
              bg="transparent"
              hoverBg="gray300"
              m={{ r: "0.5rem" }}
              onClick={() => setSideDrawer(true) }
              style={{zIndex: "200"}}
            >
              <Icon name="Menu" size="40px" />
            </Button>
            <BasicSideDrawer
              isOpen={showSideDrawer}
              onClose={() => setSideDrawer(false) }
            />
            <Row h="auto" p={{ b: "5%", t: "5%", l: { xs:"7vw", xl: "7.5vw", lg: "5vw" }, r: {  xs:"7vw", xl: "7.5vw", lg: "5vw" } }}>
              <Col size={{xs:"12", lg:"7"}} >
                <Text tag="h6" textSize={{xs:"4vw", md:"3vw", lg:"1.5vw"}}>
                  香港科技大學學生會科大校園人民廣播電台
                </Text>
                <Text tag="h1" textSize={{xs:"12vw", lg:"7vw"}} p={{ t: "10px" }}>
                  People's Campus Radio HKUSTSU
                </Text>
                <Text tag="p" textSize={{xs:"caption", sm:"body", md:"paragraph", lg:"subheader"}} p={{
                  t: { xs: '1rem', md: '1rem' },
                }} textDecor="underline">
                  Affiliated to the Students' Union of Hong Kong University of Science and Technology
                </Text>
                <Text tag="p" textWeight="300" textSize={{xs:"body", sm:"paragraph", md:"subheader", lg:"subheader", xl:"title"}} p={{ t: "2.5vh", r:{xs:"2vw", lg:"7.5vw"} }}>
                  People's Campus Radio, HKUSTSU was established in 1997, which serves the HKUST community by providing
                  high quality broadcasting service via Internet with the aim of to become one of the major
                  communication channels among the Members of HKUST community.
                  <br/>
                  <br/>
                  The objectives of the campus radio shall be to develop an open discussion culture of social and campus
                  affairs and to provide HKUST community oriented information and entertainment services.
                </Text>
              </Col>
              <Col size={{xs:"12", lg:"5"}} d="flex" align="center">
                <Div w="100%" d="flex" align="center" flexDir="column" p={{ y: "5%" }}>
                  <Div bg="gray200" h="100%" w="100%">
                    <motion.div whileHover={{x: 20, y: 20,
                      transition: { duration: 0.25 }}} animate={{ opacity: [0, 1] }} transition={{ delay: 0.5, duration: 1.5 }} >
                      <Div h={{xs:"35vh", lg:"60vh"}} bgPos="center" bgSize="cover" bgImg={aboutUsImage} border="1px dashed"/>
                    </motion.div>
                  </Div>
                  <Text textWeight="300" onClick={()=> setSideDrawer(true)}tag="p" textSize="title" p={{ t: "5%" }}>
                    <a style={{ color: "black" }} href="#">Know more about each of our previous cabinets →</a>
                  </Text>
                </Div>
              </Col>
            </Row>
            <Row h="auto" p={{ b: "5%", t: "5%", l: { xl: "7.5vw", lg: "5vw" }, r: { xl: "7.5vw", lg: "5vw" } }} bg="warning700">
              <Col size={{xs:"12", lg:"5"}}  d="flex" align="center">
                <Image height="auto%" p={{xs:"5%"}} width="auto" src={placeholder}/>
              </Col>
              <Col d="flex" align="center" size={{xs:"12", lg:"7"}}  p={{l: { xs:"7.5vw", xl: "7.5vw", lg: "5vw" }}}>
                <div>
                <Text tag="h1" textSize={{xs:"10vw", lg:"5vw"}} textColor="warning200">
                  <AnimatedText />
                  with other media
                </Text>
                <Text tag="p" textWeight="300" textSize={{xs:"body", sm:"paragraph", md:"subheader", lg:"subheader", xl:"title"}} p={{ t: "20px", r:"5vw" }} textColor="warning200">
                  In 2010, People's Campus Radio, HKUSTSU, RTHK and other university campus radios have started a
                  partner relationship in organizating "Teen Power", a programme for providing university students to
                  recieve formal DJ training and the chance to host a weekly programme at RTHK. In each year, 2 - 5
                  members from People's Campus Radio, HKUSTSU would be selected to take this one-year DJ internship at
                  RTHK.
                </Text>
                <Row p={{ r:"5vw"}} >
                  <Col size="6" data-sal="slide-right"
                       data-sal-delay="100"
                       data-sal-easing="ease">
                    <Text tag="h6" textSize="subheader" p={{ t: "30px" }} textColor="warning200">
                      Interviewed by
                    </Text>
                    <Text tag="p" textWeight="300" textSize={{xs:"caption", sm:"body", md:"paragraph", lg:"subheader"}} style={{lineHeight:"1.75rem"}} p={{ t: "20px" }} textColor="warning200">
                      The Sun Daily<br/>
                      Hi-tech Weekly<br/>PC Home<br/>Singpao<br/>Cult<br/>eZone
                    </Text>
                  </Col>
                  <Col size="6" data-sal="slide-right"
                       data-sal-delay="100"
                       data-sal-easing="ease">
                    <Text tag="h6" textSize="subheader" p={{ t: "30px" }} textColor="warning200">
                      Co-operated with
                    </Text>
                    <Text tag="p" textWeight="300" style={{lineHeight:"1.75rem"}} textSize={{xs:"caption", sm:"body", md:"paragraph", lg:"subheader"}} p={{ t: "20px", b:{xs:"20px", lg:"20px"}} } textColor="warning200">
                      RTHK<br/>The Campus Radio of Chinese University Hong Kong<br/>PolyU Campus Radio<br/>HKBU
                      CommChannel<br/>Stareastnet.com<br/>36.com
                    </Text>
                  </Col>
                </Row>
                </div>
              </Col>
            </Row>
            <Row h="auto" p={{  b: "5%", t: "5%", l: { xl: "7.5vw", lg: "5vw" }, r: { xl: "7.5vw", lg: "5vw" } }}>
              <Col d="flex" align="center" size={{xs:"12", lg:"7"}} p={{l: { xs:"7.5vw", lg: "0vw" }}}>
                <div>
                  <Text tag="h1" textSize={{xs:"10vw", lg:"7vw"}} p={{ t: "10px", r: {xs:"5vw", lg:"0vw"} }}>
                    Radio News Reporting Team
                  </Text>
                  <Text tag="p" textWeight="300" textSize="title" p={{ t: "5%", r: "7.5vw" }}>
                    As one of the medias in HKUST, it's our civic responsibility to update students on current affairs, and report major events in Hong Kong. That's why we have founded the Radio News Reporting Team.
                  </Text>
                  <Text tag="h1" textSize={{xs:"7vw", lg:"3vw"}} p={{ t: "5%", r: "7.5vw" }}>
                    We aim to provide <i>unbiased news</i>, <i>information</i> and <i>share opinions with our fellow students</i>
                  </Text>
                </div>
              </Col>
              <Col size={{xs:"12", lg:"5"}} d="flex" align="center">
                <AnimatedImage colour="grey" children={img}/>
              </Col>
            </Row>
          </div>

      <Seo facebook={facebook}/>
    </React.Fragment>
  );
};

CategoryPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default CategoryPage;
//eslint-disable-next-line no-undef
export const query = graphql`
  query PostsQuery {
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "//posts/[0-9]+.*--/" } }
      sort: { fields: [fields___prefix], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            prefix
          }
          frontmatter {
            title
            category
            cover {
              children {
                ... on ImageSharp {
                  fluid(maxWidth: 800, maxHeight: 360) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
