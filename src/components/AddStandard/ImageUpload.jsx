import {
  Button,
  Heading,
  HStack,
  Input,
  useColorModeValue,
  useDisclosure,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRef } from "react";
import { useField, useFormState } from "react-final-form";
import { IoMdTrash } from "react-icons/io";
import { MdUpload } from "react-icons/md";

import DeleteImageModal from "../Modals/DeleteImageModal";
import Control from "../FormComponents/Control";
import Error from "../FormComponents/Error";

const ImageControl = ({ img, idx, handleDeleteImage }) => {
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  return (
    <>
      <Image
        src="https://user-images.githubusercontent.com/69729390/214123449-126291c9-2cde-4773-90b7-a54a38336553.png"
        height={125}
        width={125}
        alt="construction image"
      />
      <Button
        leftIcon={<IoMdTrash />}
        colorScheme="red"
        size="xs"
        rounded={16}
        fontSize="sm"
        width="auto"
        onClick={onDeleteOpen}
      >
        Delete Image
      </Button>
      <DeleteImageModal
        onClose={onDeleteClose}
        isOpen={isDeleteOpen}
        image={img}
        index={idx}
        handleDeleteImage={handleDeleteImage}
      />
    </>
  );
};

const ImageUpload = ({ name, setValue }) => {
  const { input, meta } = useField(name, { subscription: { value: false } });
  const ref = useRef();
  const { values } = useFormState();

  const handleUploadImages = (files) => {
    const newFiles = Array.prototype.slice.call(files);
    const images = values.uploadImages || [];

    newFiles.some((img) => {
      images.push(img);
    });

    setValue("uploadImages", images);
  };

  const handleDeleteImage = (index) => {
    const images = values.uploadImages.filter((_, i) => i != index);

    setValue("uploadImages", images);
  };

  return (
    <>
      <Control name={name} my={4}>
        <HStack>
          <Button
            leftIcon={<MdUpload />}
            bgColor={useColorModeValue("blackAlpha.500")}
            _hover={{
              bgColor: `${useColorModeValue("blackAlpha.600")}`,
            }}
            color="white"
            size="sm"
            rounded={16}
            fontSize="md"
            width="auto"
            onClick={() => ref.current.click()}
          >
            Upload Images
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
          onChange={(e) => handleUploadImages(e.target.files)}
        />
      </Control>
      {values.uploadImages && values.uploadImages.length > 0 && (
        <Wrap my={4} spacing={4}>
          {Array.from(values.uploadImages).map((img, idx) => {
            return (
              <VStack key={idx}>
                <Heading size="xs" color="#6D6E70" fontWeight="semibold" mb={1}>
                  {img.name}
                </Heading>
                <ImageControl
                  img={img}
                  idx={idx}
                  handleDeleteImage={handleDeleteImage}
                />
              </VStack>
            );
          })}
        </Wrap>
      )}
    </>
  );
};

export default ImageUpload;
