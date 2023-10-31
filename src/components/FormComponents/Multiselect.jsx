import { FormLabel, HStack, Stack } from "@chakra-ui/react";
import CheckboxArrayControl from "./CheckboxArrayControl";
import Control from "./Control";
import Error from "./Error";

const Multiselect = ({ name, label, entries }) => {
  return (
    <Control name={name} my={4}>
      <HStack>
        <FormLabel
          htmlFor={name}
          m={0}
          fontSize="xl"
          fontWeight="bold"
          fontFamily="'Europa-Bold', sans-serif"
          color="#515254"
        >
          {label}
        </FormLabel>
        <Error name={name} />
      </HStack>

      <Stack mt={1} spacing={1}>
        {entries.map((e, index) => (
          <CheckboxArrayControl key={index} name={name} value={e}>
            {e}
          </CheckboxArrayControl>
        ))}
      </Stack>
    </Control>
  );
};

export default Multiselect;
