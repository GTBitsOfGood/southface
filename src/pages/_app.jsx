import Head from "next/head";
import PropTypes from "prop-types";
import React from "react";
import NavBar from "src/components/NavBar/NavBar";
import { SWRConfig } from "swr";

import fetchJson from "src/lib/utils/fetchJson";

import "focus-visible/dist/focus-visible.min.js";
import "normalize.css";
import "public/static/styles/App.css";

import { ChakraProvider } from "@chakra-ui/react";

const MyApp = ({ Component, pageProps }) => (
  <SWRConfig
    value={{
      fetcher: fetchJson,
      onError: (e) => console.error(e),
    }}
  >
    <Head>
      <title>Next.js-Starter</title>
    </Head>
    <ChakraProvider>
        <NavBar />
          <Component {...pageProps} />
    </ChakraProvider>
  </SWRConfig>
);

MyApp.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
