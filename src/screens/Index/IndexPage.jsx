import React from "react";
import { helloWorld } from "../../actions/General";
import classes from "./IndexPage.module.css";
import SearchBar from "src/components/SearchBar";

const IndexPage = () => {
  const [payload, setPayload] = React.useState("");

  React.useEffect(() => {
    // Example how to create page without ssr
    helloWorld().then((resp) => {
      setPayload(resp);
    });
  }, []);

  return (
    <>
      <h2 className={classes.centerText}>Welcome to Next.js!</h2>
      <h3>
        This page is static rendered, because all API calls are made in
        useEffect
      </h3>
      <h4>{payload}</h4>
      <p>You can tell because the text above flashes on page refresh</p>
      <SearchBar />
      {/* SearchBar only for testing purposes */}
    </>
  );
};

export default IndexPage;
