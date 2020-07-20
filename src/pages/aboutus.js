import { FaTag } from "react-icons/fa/";
import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import { ThemeContext } from "../layouts";
import Article from "../components/Article/";
import Headline from "../components/Article/Headline";
import List from "../components/List";
import Seo from "../components/Seo";
import { Col, Container, Div, Text, Row } from "atomize";
import test from "../images/png/hero-background.png";

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
          <Container>
            <Row m={{t:"8%", l: {xl: "-10vw" }}}>
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
                    <Text tag="h1" textSize="7rem" p={{t:"10px"}}>
                      People's Campus Radio HKUSTSU
                    </Text>
                    <Text tag="p" textSize="caption" textDecor="underline">
                      Affiliated to the Students' Union of Hong Kong University of Science and Technology
                    </Text>
                    <Text tag="p" textSize="body" p={{t:"20px"}}>
                      People's Campus Radio, HKUSTSU was established in 1997, which serves the HKUST community by providing high quality broadcasting service via Internet with the aim of to become one of the major communication channels among the Members of HKUST community.
                      <br/>
                      <br/>
                      The objectives of the campus radio shall be to develop an open discussion culture of social and campus affairs and to provide HKUST community oriented information and entertainment services.
                    </Text>
                    <Row>
                      <Col size="6">
                        <Text tag="h6" textSize="subheader" p={{t:"20px"}}>
                          Key facts
                        </Text>
                        <Text tag="p" textSize="caption" p={{t:"10px"}}>
                        Founded on 10 February, 1997 <br/>
                        By Ah-yuet Lee, Anthony Tsang, Robin Szeto and Sun-fung Lin
                        </Text>
                      </Col>
                      <Col size="6">
                      </Col>
                    </Row>
                  </Col>
                  <Col size="5">
                    <img src={test}/>
                  </Col>
            </Row>
          </Container>
        )}
      </ThemeContext.Consumer>

      <Seo facebook={facebook} />
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
