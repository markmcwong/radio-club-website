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
import AnimatedImage from "../components/Page/animatedImage";
import placeholder from "../images/png/placeholder.png";

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
      <Image src={bgPhoto}/>
    );
    const sq = (
      <Div m={{ t: "100px" }} h="300" w="300" bg="info300"/>
    );
    return (
      <React.Fragment>
        <style glboal jsx>{`
          hr {
            margin: 0;
            border: 0;
          }
        `}</style>
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
        <Row h="90vh" p={{ b: "5%", t: "5%", l: { xl: "7.5vw", lg: "5vw" }, r: { xl: "7.5vw", lg: "5vw" } }}>
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
            <Text tag="p" textSize="body" p={{ t: "5%", r: "10vw" }}>
              People's Campus Radio, HKUSTSU was established in 1997, which serves the HKUST community by providing
              high quality broadcasting service via Internet with the aim of to become one of the major
              communication channels among the Members of HKUST community.
              <br/>
              <br/>
              The objectives of the campus radio shall be to develop an open discussion culture of social and campus
              affairs and to provide HKUST community oriented information and entertainment services.
            </Text>
            <Text tag="p" textSize="title" p={{ t: "5%" }}>
              <a style={{ color: "black" }} href="aboutus">Know more about us &nbsp; > </a>
            </Text>
          </Col>
          <Col size="5" d="flex" align="center">
            <Image height="auto" src={placeholder} border="1px dashed"/>
          </Col>
        </Row>
        <Div bg="gray300" p={{ y: { lg: "5rem", xl: "7rem" }, x: { lg: "3rem", xl: "3rem" } }}>
          {/*<Container d="flex" align="flex-start" flexDir="column">*/}
          <Row>
            <Col size="7">
              <Div d="flex" align="centre" flexDir="column">
                <VerticalTimeline className={"test"}>
                  {timetrees.map(timetree => {
                    // tests.map(test => {});
                    const {
                      node,
                      node: { link, title, description, date, colour, label, timeline }
                    } = timetree;

                    return (
                      <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: "#fff", color: "#000", padding: "40px", boxShadow:"2px 2px 5px #ffc659", borderRadius: "5px" }}
                        contentArrowStyle={{ borderRight: "15px solid #ffc659" }}
                        date={date}
                        iconStyle={{ background: colour, color: "#fff", border: "white 5px solid", zIndex: 10}}
                        icon={<p></p>}
                        textClassName={"timeLineText"}
                      >
                        {/*contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}*/}

                        <Text tag="h1" textWeight="400" textSize="heading" className="vertical-timeline-element-title">{title}</Text>
                        <Text tag="p" textWeight="100" textSize="paragraph">{description}</Text>
                        <br/>
                        <h4 style={{cursor: "pointer", color: "rgb(255, 159, 7)"}} onClick={() => location.href = link}>{label}</h4>
                      </VerticalTimelineElement>
                    );
                  })}
                </VerticalTimeline>
              </Div>
            </Col>
            <Col size="5">
              <Div m={{ l: { xl: "-5vw", lg: "-4vw" } }}>
              <Text
                p={{ l: { xl: "5vw",lg: "3vw"}, b: { lg: "2rem", xl: "3rem" } }}
                textSize="5vw"
                textAlign="left"
                tag="h1"
                data-sal="slide-right"
                data-sal-delay="200"
                data-sal-easing="ease"
              >
                Latest News
                <br/> @Radio
              </Text>
                <Text
                  m={{ r: { xl: "0px",lg: "3vw"}, l: { xl: "5vw",lg: "3vw"}, b: { lg: "1rem", xl: "1.5rem" } }}
                  textSize="subheader"
                  textAlign="left"
                  tag="h1"
                  data-sal="slide-right"
                  data-sal-delay="200"
                  data-sal-easing="ease"
                  textWeight="400"
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod mi quis metus rhoncus, non molestie turpis sollicitudin. Sed tincidunt faucibus quam non porta. Nullam aliquet ipsum ac augue malesuada pellentesque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer consectetur tristique fringilla.
                </Text>
                <Text
                  textAlign="left"
                  m={{ r: { xl: "0px",lg: "3vw"}, l: { xl: "5vw",lg: "3vw"}, b: { lg: "1rem", xl: "1.5rem" } }}
                  textSize="heading"
                  tag="p"
                  data-sal="slide-right"
                  data-sal-delay="300"
                  data-sal-easing="ease"
                >
                  View more →
                </Text>
                <AnimatedImage colour="#8B4513" children={img} />
              </Div>
            </Col>
          </Row>
          {/*}</Container>*/}
        </Div>

        <hr ref={this.separator}/>

        <ThemeContext.Consumer>
          {theme => {/*<Blog posts={posts} theme={theme} />*/
          }
          }
        </ThemeContext.Consumer>

        <Seo facebook={facebook}/>
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
