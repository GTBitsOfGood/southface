import {
  Button,
  Flex,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Tag,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import ArrowIcon from "../../Carousel/ArrowIcon";
import Carousel from "../../Carousel/Carousel";
import ImagePreviewModal from "../ImagePreviewModal";
import ModalImage from "../ModalImage";

const CardModal = ({
  card,
  isOpenCardModal,
  onCloseCardModal,
  setCards,
  ...rest
}) => {
  const {
    isOpen: isOpenImagePreviewModal,
    onOpen: onOpenImagePreviewModal,
    onClose: onCloseImagePreviewModal,
  } = useDisclosure();

  const openImagePreviewCallback = () => {
    onCloseCardModal();
    onOpenImagePreviewModal();
  };

  return (
    <>
      <Modal
        {...rest}
        isOpen={isOpenCardModal}
        onClose={onCloseCardModal}
        size={{ base: "xs", md: "2xl", lg: "4xl" }}
      >
        <ModalOverlay />
        <ModalContent rounded={14}>
          <ModalCloseButton right={2} top={0} m={4} />
          <ModalHeader mt={10} mx={6}>
            <Flex justifyContent="space-between">
              <Heading mb={2}>{card.title}</Heading>
            </Flex>
          </ModalHeader>

          <ModalBody mx={6}>
            <Flex flexDirection="column">
              <Carousel
                cols={3}
                rows={1}
                gap={10}
                containerStyle={{
                  marginBottom: "1.5rem",
                }}
                arrowLeft={<ArrowIcon orientation="left" />}
                arrowRight={<ArrowIcon orientation="right" />}
              >
                {card.images.map(({ imageUrl: image }, index) => (
                  <Carousel.Item key={index}>
                    <ModalImage
                      image={image}
                      openImagePreviewCallback={openImagePreviewCallback}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>

              <Text lineHeight="normal" fontSize="18px">
                {card.criteria}
              </Text>

              <SimpleGrid mt={3} mb={15} columns={2}>
                <HStack gap={1} overflowX="auto">
                  {card.tags.map((tag, index) => (
                    <Tag
                      bgColor="#c4d600"
                      borderRadius="30px"
                      key={index}
                      minWidth="fill"
                    >
                      {tag}
                    </Tag>
                  ))}
                </HStack>
                <Flex gap={2} justifyContent="right">
                  <Button
                    size="lg"
                    variant="grey-outlined"
                    onClick={openImagePreviewCallback}
                  >
                    View Notes
                  </Button>
                  <Button variant="blue" size="lg">
                    Add to Report
                  </Button>
                </Flex>
              </SimpleGrid>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <ImagePreviewModal
        isOpen={isOpenImagePreviewModal}
        onClose={onCloseImagePreviewModal}
        card={card}
        setCards={setCards}
      />
    </>
  );
};
export default CardModal;
