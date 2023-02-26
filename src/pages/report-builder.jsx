import { Box, Button, Card, CardBody, Flex, Heading, HStack, Input, StackDivider, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useSWRConfig } from "swr";
import RecentStandardsView from "../components/RecentStandardsView";
import { ReportStandard } from "../components/StandardCard";
import useUser from "../lib/hooks/useUser";
import urls from "../lib/utils/urls";

const ReportBuilder = () => {
  // For PDF exporting
  const [hasLoaded, setHasLoaded] = useState(false);
  useEffect(() => setHasLoaded(true), []);

  const sampleCard = {
    _id: {
      $oid: "63f7b5ad34cb7045aff50cfd",
    },
    images: [
      {
        imageUrl:
          "https://southface.blob.core.windows.net/standards/Insulated%20Header_2.jpg?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-06-01T05:16:32Z&st=2022-10-04T21:16:32Z&spr=https,http&sig=KgPfwiJCwB%2FkO1XWWxizaxI3V%2B371oFouekiaRmOV8g%3D",
        thumbsUp: 0,
        thumbsDown: 0,
        _id: {
          $oid: "63f7b5ad34cb7045aff50cfe",
        },
      },
      {
        imageUrl:
          "https://southface.blob.core.windows.net/standards/Insulated%20Header_2.jpg?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-06-01T05:16:32Z&st=2022-10-04T21:16:32Z&spr=https,http&sig=KgPfwiJCwB%2FkO1XWWxizaxI3V%2B371oFouekiaRmOV8g%3D",
        thumbsUp: 0,
        thumbsDown: 0,
        _id: {
          $oid: "63f7b5ad34cb7045aff50cff",
        },
      },
    ],
    title: "Brown cellulose From Postman",
    notes: [
      {
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        userId: "63c5be6fa7d3c693fa1d335a",
        date: {
          $date: {
            $numberLong: "1677178036009",
          },
        },
        _id: {
          $oid: "63f7b5ad34cb7045aff50d00",
        },
      },
      {
        body: "t enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        userId: "63c5be6fa7d3c693fa1d335a",
        date: {
          $date: {
            $numberLong: "1677178036009",
          },
        },
        _id: {
          $oid: "63f7b5ad34cb7045aff50d01",
        },
      },
    ],
    criteria:
      "This is a sample text criteria. The following text will render right now",
    tags: ["bathroom"],
    buildingType: "commercial",
    primaryCategory: "site-planning",
    __v: 0,
  };

  const sampleReport = {
    cards: [
      {
        $oid: "63f7b5ad34cb7045aff50d1b",
      },
      {
        $oid: "63f7b5ad34cb7045aff50d16",
      },
    ],
  };

  const { report, mutateReport, isValidating } = useSWRConfig(urls.api.user.getArchivedReports);

  const nameRef = useRef();

  return (
    <>
      <HStack alignItems="flex-start" spacing={3}>
        <VStack
          flex={2}
          as={Card}
          alignItems="flex-start"
          p={6}
          spacing={5}
          divider={<StackDivider />}
        >
          <CardBody m={-3} w="100%">
            <Flex mb={3} width="100%" flexFlow="row nowrap">
              <HStack w="100%" alignItems="flex-start">
                {hasLoaded ? ( // temp placeholder condition
                  <Heading maxW="80%" mr={3}>
                    Title of Current Project Plan
                  </Heading>
                ) : (
                  <Input
                    size="lg"
                    maxW="50%"
                    fontSize="3xl"
                    variant="flushed"
                    mr={3}
                    placeholder="Title of Current Project Plan"
                    ref={nameRef}
                  />
                )}
                <Button>Rename</Button>
              </HStack>
              <Button bg="gold" color="white">
                End Project Plan
              </Button>
            </Flex>
          </CardBody>
          {report && report.cards.map((card, index) =>
            <CardBody key={index}>
              <ReportStandard card={sampleCard} />
            </CardBody>
          )}
        </VStack>
        <VStack maxW="35%" flex={1}>
          <VStack
            w="100%"
            flex={2}
            as={Card}
            alignItems="flex-start"
            p={6}
            spacing={5}
            divider={<StackDivider />}
          >
            {Array(3)
              .fill(report)
              .map((report, index) =>
                index === 0 ? (
                  <Box key={index}>
                    <Heading size="lg" p={5}>
                      Completed Reports
                    </Heading>
                    <Button>See All Completed Reports</Button>
                  </Box>
                ) : (
                  "Bruh"
                )
              )}
          </VStack>
          <Card p={5} w="100%">
            <RecentStandardsView maxCards={3} />
          </Card>
        </VStack>
      </HStack>
    </>
  );
};



export default ReportBuilder;
