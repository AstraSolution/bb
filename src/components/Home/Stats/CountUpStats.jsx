import React from "react";
import CountUp from "react-countup";

const CountUpStats = () => {
  return (
    <CountUp start={0} end={764} duration={2.5} separator="," suffix="K">
      {({ countUpRef }) => (
        <h6 className="text-3xl font-bold lg:text-4xl xl:text-5xl" ref={countUpRef} />
      )}
    </CountUp>
  );
};

export default CountUpStats;
