import React from "react";
import JobItems from "../JobItems";

function JobContainer (props) {
  return (
    <div className="container job-container">
      {props.jobItems.map((item, index)=> <JobItems item={item} key={index} />)}
    </div>
  )
}

export default JobContainer;