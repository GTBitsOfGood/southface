import React, { useEffect } from "react";
import { Box, Button, Grid, GridItem, Spinner, Text } from "@chakra-ui/react";
import StandardCard from "../StandardCard/StandardCard";

const StandardCardTable = ({ isLoggedIn, isAdmin }: StandardCardTableProps) => {
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
      setTimeout(res, 1000);
    });
  };

  const handleCreate = () => {
    alert("Create new card");
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
      {!loading && isLoggedIn && isAdmin ? (
        <Button onClick={handleCreate} left="85%">
          Create New Card
        </Button>
      ) : (
        <></>
      )}
      <Grid
        mt="5%"
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
                <Box w="320px" h="510px" bg="white" zIndex={2}>
                  <StandardCard
                    cardId={index}
                    isLoggedIn={isLoggedIn}
                    isAdmin={isAdmin}
                  />
                </Box>
                <Box
                  w="320px"
                  h="510px"
                  bg="white"
                  borderColor="#D9D9D9"
                  borderWidth="2px"
                  ml="-100%"
                  mr="-100%"
                  mt="4%"
                  zIndex={1}
                ></Box>
                <Box
                  w="320px"
                  h="510px"
                  bg="white"
                  borderColor="#D9D9D9"
                  borderWidth="2px"
                  ml="-0%"
                  mr="-50%"
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

interface StandardCardTableProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
}

export default StandardCardTable;
