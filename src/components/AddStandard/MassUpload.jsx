import { Button, Flex, HStack, Input, Text } from "@chakra-ui/react";
import { useRef } from "react";
import { useField, useForm, useFormState } from "react-final-form";
import { MdUpload } from "react-icons/md";

import Control from "../FormComponents/Control";
import Error from "../FormComponents/Error";

import { parseUploadCardFile } from "../../actions/upload";

const MassUpload = ({ name }) => {
  const { input, meta } = useField(name, { subscription: { value: false } });
  const ref = useRef();
  const { values } = useFormState();
  const { mutators } = useForm();

  const handleUploadFile = async (file) => {
    const uploadedFile = Array.prototype.slice.call(file)[0];

    console.log(uploadedFile);
    const cards = await parseUploadCardFile(uploadedFile);

    mutators.setValue("massUpload", cards);
    mutators.setValue("massUploadFileName", uploadedFile.name);
  };

  return (
    <Flex alignItems="center">
      <Control name={name} my={4} mr={4} w="auto">
        <HStack>
          <Button
            leftIcon={<MdUpload />}
            variant="Grey-rounded"
            size="sm"
            fontSize="md"
            width="auto"
            onClick={() => ref.current.click()}
          >
            Upload File
          </Button>
          <Error name={name} />
        </HStack>
        <Input
          {...input}
          isInvalid={meta.error && meta.touched}
          id={name}
          ref={ref}
          type="file"
          display="none"
          onChange={(e) => handleUploadFile(e.target.files)}
        />
      </Control>
      <Text>{values.massUploadFileName}</Text>
    </Flex>
  );
};

export default MassUpload;
