import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Input, Spinner, useToast } from "@chakra-ui/react";
import { useRef } from "react";
import { uploadFile } from "src/lib/utils/blobStorage";

const AddImageModal = ({ setValue, form, ...props }) => {
  const fileRef = useRef();
  const toastRef = useRef();
  const uploadingToast = useToast();

  const handleImageUploads = async (images) => {
    toastRef.current = uploadingToast({
      title: images.length == 1 ? "Uploading Image..." : "Uploading Images...",
      status: "info",
      duration: 20000,
      isClosable: true,
      icon: <Spinner />,
    });
    const existingImages = JSON.parse(JSON.stringify(form.values.images));

    let imagesSucceeded = 0;
    for (let image of images) {
      
      const res = await uploadFile(image.name, image);
      if (!(res instanceof Error)) {
        imagesSucceeded++;

        const imageObject = {
          imageUrl: res._response.request.url,
          thumbsUp: [],
          thumbsDown: [],
        };

        existingImages.push(imageObject);

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
    }

    if (imagesSucceeded == images.length) {
      if (toastRef.current) {
        uploadingToast.update(toastRef.current, {
          title: "Image Uploaded",
          duration: 2000,
          isClosable: true,
          status: "success",
        });
      }
    }

    setValue("images", existingImages);
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
