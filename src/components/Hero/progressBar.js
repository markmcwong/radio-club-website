import React from "react";

const ProgressBar = ({ width, percent }) => {

  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    setValue(percent * width);
  });

  return (
    <div>
      <div className="progress-div" style={{ width: width }}>
        <div style={{ width: `${value}px` }} className="progress"/>
      </div>
      <style jsx>{`
        .progress-div {
          background-color: rgb(233, 233, 233);
          border-radius: 0.5rem;
      }


    .progress {
      background-color: rgb(62, 122, 235);
      height: 10px;
      border-radius: 1rem;
      transition: 1s ease;
      transition-delay: 0.5s;
    }
    `}</style>
    </div>
  );
};
export default ProgressBar;
