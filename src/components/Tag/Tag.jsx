import { Box, Flex } from "@chakra-ui/react";
import urls from "lib/utils/urls";
import useSWR from "swr";
import TagBox from "./TagBox";

const Tag = (props) => {
  const { data } = useSWR(urls.api.tag.getObject);
  const tags = data?.payload[0];

  return (
    <Flex {...props} direction="column" wrap="wrap">
      {tags &&
        Object.keys(tags).map((letter) => {
          return (
            <Box key={letter}>
              <TagBox
                key={letter}
                letter={letter}
                list={tags[letter]}
                isTruncated
              />
            </Box>
          );
        })}
    </Flex>
  );
};

export default Tag;
