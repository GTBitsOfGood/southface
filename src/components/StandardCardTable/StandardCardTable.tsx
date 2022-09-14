import React, { useEffect } from "react";
import { Box, Grid, GridItem, Spinner, Text } from "@chakra-ui/react";
import { resolve } from "styled-jsx/css";

const StandardCardTable = () => {
  const [loading, setLoading] = React.useState(false);

  const cards = [
    "Category 1",
    "Category 2",
    "Category 3",
    "Category 4",
    "Category 5",
    "Category 6",
    "Category 7",
    "Category 8",
  ];

  const delay = () => {
    return new Promise((res) => {
      setTimeout(res, 2000);
    });
  };

  useEffect(() => {
    setLoading(true);
    delay().then(() => setLoading(false));
  }, []);

  return (
    <Box>
      {loading && (
        <Box textAlign="center">
          <Spinner size="xl" />{" "}
        </Box>
      )}
      <Grid
        templateColumns={{
          base: "repeat(1, 300px)",
          md: "repeat(2, 300px)",
          lg: "repeat(3, 300px)",
          xl: "repeat(4, 300px)",
        }}
        gap={{
          base: "2%",
          md: "3%",
          lg: "5%",
        }}
        m="10% 5% 15%"
        justifyContent="center"
      >
        {!loading &&
          cards.map((item, index) => (
            <GridItem w="100%" mb="15%" key={index}>
              <Text fontSize="xl">{item}</Text>
              <Box display="flex">
                <Box
                  w="199px"
                  h="306px"
                  bg="white"
                  borderColor="#D9D9D9"
                  borderWidth="2px"
                  zIndex={2}
                ></Box>
                <Box
                  w="199px"
                  h="306px"
                  bg="white"
                  borderColor="#D9D9D9"
                  borderWidth="2px"
                  ml="-62%"
                  mt="4%"
                  zIndex={1}
                ></Box>

                <Box
                  w="199px"
                  h="306px"
                  bg="white"
                  borderColor="#D9D9D9"
                  borderWidth="2px"
                  ml="-62%"
                  mt="8%"
                  zIndex={0}
                ></Box>
              </Box>
            </GridItem>
          ))}
      </Grid>
    </Box>
  );
};

export default StandardCardTable;
