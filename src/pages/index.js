import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import { ThemeContext } from "../layouts";
import Blog from "../components/Blog";
import Hero from "../components/Hero";
import Seo from "../components/Seo";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Item from "../components/Blog/Item";
import { Div, Text, Container } from "atomize";

class IndexPage extends React.Component {
  separator = React.createRef();

  scrollToContent = e => {
    this.separator.current.scrollIntoView({ block: "start", behavior: "smooth" });
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

    return (
      <React.Fragment>
        <ThemeContext.Consumer>
          {theme => (
            <Hero scrollToContent={this.scrollToContent} backgrounds={backgrounds} theme={theme} site={carouselSlide}/>
          )}
        </ThemeContext.Consumer>
        <Div bg="gray300" p={{ y: { lg: "5rem", xl: "7rem" } }}>
          <Container d="flex" align="center" flexDir="column">
            <Text p={{ b: { lg: "2rem", xl: "3rem" } }} textSize="display3" tag="h1">Latest News</Text>

          <VerticalTimeline>
            {timetrees.map(timetree => {
              const {
                node,
                node: {
                  link,
                  title,
                  description,
                  date,
                  colour,
                  label
                }
              } = timetree;
              return <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: "#fff", color: "#000" }}
                date={date}
                iconStyle={{ background: colour, color: "#fff" }}
                >
                {/*contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}*/}

                <h3 className="vertical-timeline-element-title">{title}</h3>
                <h4 className="vertical-timeline-element-subtitle"></h4>
                <p>
                  {description}
                </p>
                <a href={link}>{label}</a>
              </VerticalTimelineElement>;
            })}
          </VerticalTimeline>
          <Text p={{ t: { lg: "2rem", xl: "3rem" } }} textSize="heading" tag="h4">View more</Text>
          </Container>
        </Div>

        <hr ref={this.separator}/>

        <ThemeContext.Consumer>
          {theme => <Blog posts={posts} theme={theme}/>}
        </ThemeContext.Consumer>

        <Seo facebook={facebook}/>

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
    allTimetreeJson{
      edges {
        node {
          link
          title
          description
          date
          colour
          label
        }
      }
    },
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
            author
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
    bgDesktop: imageSharp(fluid: { originalName: { regex: "/office/" } }) {
      resize(width: 1200, quality: 100, cropFocus: CENTER) {
        src
      }
    }
    bgTablet: imageSharp(fluid: { originalName: { regex: "/office/" } }) {
      resize(width: 800, height: 1100, quality: 100, cropFocus: CENTER) {
        src
      }
    }
    bgMobile: imageSharp(fluid: { originalName: { regex: "/office/" } }) {
      resize(width: 450, height: 850, quality: 100, cropFocus: CENTER) {
        src
      }
    }
  }
`;

//hero-background
