import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Input, Spinner, useToast } from "@chakra-ui/react";
import { useRef } from "react";
import { isValidBlobUrl, uploadFile } from "src/lib/utils/blobStorage";

const AddImageModal = ({ setValue, form, cardId, ...props }) => {
  const fileRef = useRef();
  const toastRef = useRef();
  const uploadingToast = useToast();

  const handleImageUploads = (images) => {
    toastRef.current = uploadingToast({
      title: images.length == 1 ? "Uploading Image..." : "Uploading Images...",
      status: "info",
      duration: 20000,
      isClosable: false,
      icon: <Spinner />,
    });
    const existingImages = JSON.parse(JSON.stringify(form.values.images));
    const metadata = {};
    const tags = {
      cardId: cardId,
    };

    for (let image of images) {
      let imagesSucceeded = 0;
      uploadFile(image.name, image, metadata, tags).then((res) => {
        if (!(res instanceof Error) && isValidBlobUrl(res)) {
          imagesSucceeded++;
          existingImages.push(res);
          if (imagesSucceeded == images.length) {
            if (toastRef.current) {
              uploadingToast.update(toastRef.current, {
                title: "Image Uploaded",
                duration: 2000,
                isClosable: true,
                status: "success",
              });
            }
            setValue("images", existingImages);
          }
        } else {
          if (toastRef.current) {
            uploadingToast.update(toastRef.current, {
              title: "Upload Failed",
              duration: 10000,
              isClosable: true,
              status: "error",
            });
          }
        }
      });
    }
  };

  return (
    <>
      <Box
        position="relative"
        {...props}
        width="full"
        height="full"
        minHeight="48"
      >
        <Box width="full" height="full">
          <Button
            justifyContent="center"
            alignItems="center"
            boxShadow="lg"
            width="full"
            height="calc(100% - .5rem)"
            bgColor="white"
            _hover={{ bgColor: "#ededed" }}
            onClick={() => {
              fileRef.current.click();
              fileRef.current.value = null;
            }}
          >
            <Box padding="1.5rem" rounded="full" bgColor="#6D6E70">
              <AddIcon boxSize="2.5rem" color="white" />
              <Input
                type="file"
                id="fileInput"
                ref={fileRef}
                display="none"
                accept="image/png,image/jpg,image/jpeg,image/gif,image/webp,image/tiff"
                multiple={true}
                onChange={(e) => {
                  let files = e.target.files;
                  handleImageUploads(files);
                }}
              />
            </Box>
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AddImageModal;
