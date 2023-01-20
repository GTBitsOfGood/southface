import React from "react";
import classes from "./IndexPage.module.css";

const IndexPage = () => {
  return (
    <>
      <h2 className={classes.centerText}>Welcome to Next.js!</h2>
      <h3>
        This page is static rendered, because all API calls are made in
        useEffect
      </h3>
    </>
  );
};

export default IndexPage;
