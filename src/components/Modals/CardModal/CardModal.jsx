import {
  Button,
  Flex,
  GridItem,
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
import useActiveReport from "../../../lib/hooks/useActiveReport";
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

  const { changeInReport } = useActiveReport();
  const { selState } = { ...rest };
  const imgArr = function(){
    if (selState && selState.imgSelections.length === card.images.length) {
      return selState.imgSelections;
    } else {
      return Array(card.images.length).fill(false);
    }
  }()

  const imgToggleHandler = (index) => () => {
    if (selState) {
      imgArr[index] = !imgArr[index];
      const newSel = { ...selState };
      newSel.imgSelections = imgArr;
      changeInReport(newSel);
    }
  }
  const { selected = false, reportAddHandler = () => {} } = { ...rest };

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
                      onClick={imgToggleHandler(index)}
                      borderWidth={selState?.imgSelections[index] ? "10px" : "0px"}
                      borderColor={selState?.imgSelections[index] ? "red.500" : "none"}
                      image={image}
                      openImagePreviewCallback={openImagePreviewCallback}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>

              <Text lineHeight="normal" fontSize="18px">
                {card.criteria}
              </Text>

              <Text>
                Bruh: 
              </Text>

              <SimpleGrid mt={3} mb={15} columns={5}>
                <HStack as={GridItem} colSpan={2} gap={1} overflowX="auto">
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
                <Flex as={GridItem} colSpan={3} gap={2} justifyContent="right">
                  <Button
                    size="lg"
                    variant="Grey-outlined"
                    onClick={openImagePreviewCallback}
                  >
                    View Notes
                  </Button>
                  <Button onClick={reportAddHandler} variant="Blue" size="lg">
                    {!selected ? "Add to Report" : "Added to Report"}
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
        selState={selState}
      />
    </>
  );
};
export default CardModal;
