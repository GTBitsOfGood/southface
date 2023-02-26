import { Box, Heading } from "@chakra-ui/react";

export default function Report({ report }) {
  return (
    <Box>
        <Heading size="lg" p={5}>
        {report.name}
        </Heading>
    </Box>
  );
}
