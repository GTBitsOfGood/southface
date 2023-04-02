import {
  Button,
  Heading,
  HStack,
  Input,
  useDisclosure,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRef } from "react";
import { useField, useForm, useFormState } from "react-final-form";
import { IoMdTrash } from "react-icons/io";
import { MdUpload } from "react-icons/md";

import Control from "../FormComponents/Control";
import Error from "../FormComponents/Error";
import DeleteImageModal from "../Modals/DeleteImageModal";

const ImageControl = ({ img, idx, handleDeleteImage }) => {
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const imageUrl = URL.createObjectURL(img);

  // use for testing (placeholder)
  // const imageUrl =
  //   "https://user-images.githubusercontent.com/69729390/214123449-126291c9-2cde-4773-90b7-a54a38336553.png";
  return (
    <>
      <Image
        src={imageUrl}
        objectFit="cover"
        height={125}
        width={125}
        alt="construction image"
      />
      <Button
        leftIcon={<IoMdTrash />}
        variant="Red-rounded"
        size="xs"
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

const ImageUpload = ({ name }) => {
  const { input, meta } = useField(name, { subscription: { value: false } });
  const ref = useRef();
  const { values } = useFormState();
  const { mutators } = useForm();

  const handleUploadImages = (files) => {
    const newFiles = Array.prototype.slice.call(files);

    const images = values.uploadImages || [];

    newFiles.some((img) => {
      images.push(img);
    });

    mutators.setValue("uploadImages", images);
  };

  const handleDeleteImage = (index) => {
    const images = values.uploadImages.filter((_, i) => i != index);

    mutators.setValue("uploadImages", images);
  };

  return (
    <>
      <Control name={name} my={4}>
        <HStack>
          <Button
            leftIcon={<MdUpload />}
            variant="Grey-rounded"
            size="sm"
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
          accept="image/png, image/gif, image/jpeg"
          display="none"
          onChange={(e) => handleUploadImages(e.target.files)}
        />
      </Control>
      {values.uploadImages && values.uploadImages.length > 0 && (
        <Wrap my={4} spacing={4}>
          {Array.from(values.uploadImages).map((img, idx) => {
            return (
              <VStack key={idx}>
                <Heading size="xs" color="Grey" fontWeight="semibold" mb={1}>
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
