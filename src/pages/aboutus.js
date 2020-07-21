import { FaTag } from "react-icons/fa/";
import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import { ThemeContext } from "../layouts";
import Article from "../components/Article/";
import Headline from "../components/Article/Headline";
import List from "../components/List";
import Seo from "../components/Seo";
import { Col, Container, Div, Text, Row, Image } from "atomize";
import test from "../images/png/placeholder.png";

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

  const categoryList = [];

  for (var key in categories) {
    categoryList.push([key, categories[key]]);
  }

  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <div>
            <Row m={{ t: "8%", l: { xl: "7.5vw", lg: "5vw" }, r: { xl: "7.5vw", lg: "5vw" } }}>
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
                <Text tag="h6" textSize="subheader">
                  香港科技大學學生會科大校園人民廣播電台
                </Text>
                <Text tag="h1" textSize="7vw" p={{ t: "10px" }}>
                  People's Campus Radio HKUSTSU
                </Text>
                <Text tag="p" textSize="caption" textDecor="underline">
                  Affiliated to the Students' Union of Hong Kong University of Science and Technology
                </Text>
                <Text tag="p" textSize="body" p={{ t: "20px" ,r: "10vw"}}>
                  People's Campus Radio, HKUSTSU was established in 1997, which serves the HKUST community by providing
                  high quality broadcasting service via Internet with the aim of to become one of the major
                  communication channels among the Members of HKUST community.
                  <br/>
                  <br/>
                  The objectives of the campus radio shall be to develop an open discussion culture of social and campus
                  affairs and to provide HKUST community oriented information and entertainment services.
                </Text>
                <Row>
                  <Col size="6">
                    <Text tag="h6" textSize="subheader" p={{ t: "20px" }}>
                      Key facts
                    </Text>
                    <Text tag="p" textSize="caption" p={{ t: "10px" }}>
                      Founded on 10 February, 1997 <br/>
                      By Ah-yuet Lee, Anthony Tsang, Robin Szeto and Sun-fung Lin
                    </Text>
                  </Col>
                  <Col size="6">
                  </Col>
                </Row>
              </Col>
              <Col size="5" d="flex" align="center">
                <Image height="auto" src={test} border="1px dashed"/>
              </Col>
            </Row>
            <Row m={{ t: "8%", l: { xl: "7.5vw", lg: "5vw" }, r: { xl: "7.5vw", lg: "5vw" } }}>
              <Col size="7">
                <Text tag="h1" textSize="5vw">
                  Cooperation <br/> with other media
                </Text>
                <Text tag="p" textSize="body" p={{ t: "20px" ,r: "10vw"}}>
                  In 2010, People's Campus Radio, HKUSTSU, RTHK and other university campus radios have started a partner relationship in organizating "Teen Power", a programme for providing university students to recieve formal DJ training and the chance to host a weekly programme at RTHK. In each year, 2 - 5 members from People's Campus Radio, HKUSTSU would be selected to take this one-year DJ internship at RTHK.
                </Text>
                <Row>
                  <Col size="6">
                    <Text tag="h6" textSize="subheader" p={{ t: "20px" }}>
                      Interviewed by
                    </Text>
                    <Text tag="p" textSize="caption" p={{ t: "10px" }}>
                      The Sun Daily<br/>
                      Hi-tech Weekly<br/>PC Home<br/>Singpao<br/>Cult<br/>eZone
                    </Text>
                  </Col>
                  <Col size="6">
                    <Text tag="h6" textSize="subheader" p={{ t: "20px" }}>
                      Co-operated with
                    </Text>
                    <Text tag="p" textSize="caption" p={{ t: "10px" }}>
                      RTHK<br/>The Campus Radio of Chinese University Hong Kong<br/>PolyU Campus Radio<br/>HKBU CommChannel<br/>Stareastnet.com<br/>36.com
                    </Text>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        )}
      </ThemeContext.Consumer>

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
