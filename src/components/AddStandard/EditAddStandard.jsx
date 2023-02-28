import { Box, Button, Flex, FormLabel } from "@chakra-ui/react";
import { useEffect } from "react";
import InputControl from "../FormComponents/InputControl";
import Multiselect from "../FormComponents/Multiselect";
import TextareaControl from "../FormComponents/TextareaControl";
import CreateTag from "./CreateTag";
import ImageUpload from "./ImageUpload";

const buildingTypes = ["Multifamily", "Single Family", "Commercial"];
const primaryCategories = [
  "Site Planning",
  "Resource Efficiency",
  "Durability and Moisture Management",
  "High Performance Building Envelope",
  "Energy Efficient HVAC Systems",
  "Indoor Air Quality",
  "Plumbing and Irrigation",
  "Efficient Lighting and Appliances",
  "Education and Operations",
];

const ReviewAddButton = ({ handleSubmit }) => (
  <Button variant="Blue" mr="15%" fontSize="md" onClick={handleSubmit}>
    Review and Add
  </Button>
);

const EditAddStandard = ({ handleSubmit }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Box>
      <Box w="50%">
        <FormLabel
          fontSize="xl"
          fontWeight="bold"
          color="#8C8C8C"
          mb={1}
          mt={5}
        >
          General Information
        </FormLabel>
        <InputControl name="title" label="Title of Standard" type="text" />

        <TextareaControl name="standardCriteria" label="Standard Criteria" />
      </Box>

      <ImageUpload name="uploadImages" />

      <Box w="50%">
        <Multiselect
          name="buildingType"
          label="Building Type"
          entries={buildingTypes}
        />

        <Multiselect
          name="primaryCategory"
          label="Primary Category"
          entries={primaryCategories}
        />
      </Box>

      <Box w="50%">
        <CreateTag />
      </Box>

      <Flex width="full" justifyContent="right">
        <ReviewAddButton handleSubmit={handleSubmit} />
      </Flex>
    </Box>
  );
};

export default EditAddStandard;
