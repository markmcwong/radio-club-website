import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
require("core-js/fn/array/find");

import Article from "../components/Article";
import Search from "../components/Search";
import { ThemeContext } from "../layouts";
import Seo from "../components/Seo";

import AlgoliaIcon from "!svg-react-loader!../images/svg-icons/search-by-algolia.svg?name=AlgoliaLogo";

const ActivitiesPage = props => {

  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>
            <div className="icon">
              <a>
                Calendar
              </a>
            </div>

          </Article>
        )}
      </ThemeContext.Consumer>


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

ActivitiesPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default ActivitiesPage;

//eslint-disable-next-line no-undef
