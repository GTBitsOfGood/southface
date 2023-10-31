import Head from "next/head";
import PropTypes from "prop-types";
import React from "react";
import NavBar from "src/components/NavBar/NavBar";
import "src/styles/fonts.css";
import { SWRConfig } from "swr";
import Footer from "../components/NavBar/Footer";

import fetchJson from "src/lib/utils/fetchJson";
import { southfaceTheme } from "src/styles/theme";

import "focus-visible/dist/focus-visible.min.js";
import "normalize.css";
// import "@fontsource/inter/400.css";

import { ChakraProvider } from "@chakra-ui/react";

const MyApp = ({ Component, pageProps }) => (
  <SWRConfig
    value={{
      fetcher: fetchJson,
      onError: (e) => console.error(e),
    }}
  >
    <Head>
      <title>EarthCraft</title>
    </Head>
    <ChakraProvider theme={southfaceTheme}>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
  </SWRConfig>
);

MyApp.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
