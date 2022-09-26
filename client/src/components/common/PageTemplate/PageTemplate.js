import React, { Fragment } from "react";
import Header from "../Header";

import "./PageTemplate.scss";

const PageTemplate = props => {
  return (
    <Fragment>
      <Header />
      <div className="main-content">
        <div className="page-content">{props.children}</div>
      </div>
    </Fragment>
  );
};

export default PageTemplate;
