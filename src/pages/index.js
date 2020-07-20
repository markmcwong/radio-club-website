import PropTypes from "prop-types";
import React, { useState } from "react";
import { graphql } from "gatsby";
import { ThemeContext } from "../layouts";
import Blog from "../components/Blog";
import Hero from "../components/Hero";
import Seo from "../components/Seo";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Item from "../components/Blog/Item";
import { Div, Text, Container, Col, Row, Image } from "atomize";
import Test from "../components/Page/animatedImage";

class IndexPage extends React.Component {
  separator = React.createRef();
  scrollToContent = e => {
    this.separator.current.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  state = {
    show: true
  };

  render() {
    const {
      data: {
        posts: { edges: posts = [] },
        bgDesktop: {
          resize: { src: desktop }
        },
        bgTablet: {
          resize: { src: tablet }
        },
        bg: {
          resize: { src: bgPhoto }
        },
        bgMobile: {
          resize: { src: mobile }
        },
        site: {
          siteMetadata: { facebook }
        },
        carousel: { edges: carouselSlide = [] },
        allTimetreeJson: { edges: timetrees = [] }
      }
    } = this.props;

    const backgrounds = {
      desktop,
      tablet,
      mobile
    };
    const img = (
        <Image src={bgPhoto} />
    );
    return (
      <React.Fragment>
        <ThemeContext.Consumer>
          {theme => (
            <Hero
              scrollToContent={this.scrollToContent}
              backgrounds={backgrounds}
              theme={theme}
              site={carouselSlide}
            />
          )}
        </ThemeContext.Consumer>
        <Div bg="gray300" p={{ y: { lg: "5rem", xl: "7rem" }, x: { lg: "3rem", xl: "3rem" } }}>
          {/*<Container d="flex" align="flex-start" flexDir="column">*/}
          <Text
            p={{ l: { xl: "4rem" }, b: { lg: "2rem", xl: "3rem" } }}
            textSize="display3"
            tag="h1"
            data-sal="slide-right"
            data-sal-delay="200"
            data-sal-easing="ease"
          >
            Latest News
          </Text>
          <Row>
            <Col size="7">
              <Container d="flex" align="centre" flexDir="column">
                <VerticalTimeline>
                  {timetrees.map(timetree => {
                    // tests.map(test => {});
                    const {
                      node,
                      node: { link, title, description, date, colour, label, timeline }
                    } = timetree;

                    return (
                      <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: "#fff", color: "#000" }}
                        date={date}
                        iconStyle={{ background: colour, color: "#fff" }}
                      >
                        {/*contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}*/}

                        <h3 className="vertical-timeline-element-title">{title}</h3>
                        <h4 className="vertical-timeline-element-subtitle"></h4>
                        <p>{description}</p>
                        <a href={link}>{label}</a>
                      </VerticalTimelineElement>
                    );
                  })}
                </VerticalTimeline>
              </Container>
            </Col>
            <Col size="5">
              <Test children={img} />
            </Col>
          </Row>
          <div style={{ margin: "auto" }}>
            <Text
              textAlign="center"
              p={{ t: { lg: "2rem", xl: "3rem" } }}
              textSize="heading"
              tag="p"
              data-sal="slide-up"
              data-sal-delay="300"
              data-sal-easing="ease"
            >
              View more
            </Text>
          </div>
          {/*}</Container>*/}
        </Div>

        <hr ref={this.separator} />

        <ThemeContext.Consumer>
          {theme => <Blog posts={posts} theme={theme} />}
        </ThemeContext.Consumer>

        <Seo facebook={facebook} />

        <style jsx>{`
          hr {
            margin: 0;
            border: 0;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default IndexPage;

//eslint-disable-next-line no-undef
export const query = graphql`
  query IndexQuery {
    allTimetreeJson {
      edges {
        node {
          link
          title
          description
          date
          colour
          label
          timeline
        }
      }
    }
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
    carousel: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "//parts/carousel[0-9]+/" } }
      sort: { fields: [fields___prefix], order: ASC }
    ) {
      edges {
        node {
          fields {
            slug
            prefix
          }
          frontmatter {
            title
            description
            action
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
    bg: imageSharp(fluid: { originalName: { regex: "/20gb/" } }) {
      resize(width: 1200, quality: 100, cropFocus: CENTER) {
        src
      }
    }
    bgDesktop: imageSharp(fluid: { originalName: { regex: "/home-background/" } }) {
      resize(width: 1200, quality: 100, cropFocus: CENTER) {
        src
      }
    }
    bgTablet: imageSharp(fluid: { originalName: { regex: "/home-background/" } }) {
      resize(width: 800, height: 1100, quality: 100, cropFocus: CENTER) {
        src
      }
    }
    bgMobile: imageSharp(fluid: { originalName: { regex: "/home-background/" } }) {
      resize(width: 450, height: 850, quality: 100, cropFocus: CENTER) {
        src
      }
    }
  }
`;

//hero-background
