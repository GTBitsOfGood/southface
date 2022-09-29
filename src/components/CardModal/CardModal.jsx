import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Modal,
  ModalCloseButton,
  ModalBody,
  Button,
  Image,
  Text,
  Flex,
  Tag,
  ModalFooter,
  HStack,
  Heading,
  useTheme,
} from "@chakra-ui/react";

import RatingStars from "./RatingStars";

const CardModal = ({
  isOpen,
  onClose,
  headerValue,
  description,
  image,
  tags,
  ...rest
}) => {
  const theme = useTheme();

  const ModalImage = ({ ...props }) => (
    <Image {...props} objectFit="cover" boxSize="2xs" boxShadow="dark-lg" />
  );

  return (
    <Modal {...rest} isOpen={isOpen} onClose={onClose} isCentered size="4xl">
      <ModalOverlay />
      <ModalContent rounded={14}>
        <ModalCloseButton
          size="sm"
          border="2px solid black"
          left={0}
          top={0}
          rounded="full"
          m={4}
        />
        <ModalHeader mt={10} mx={6}>
          <Flex justifyContent="space-between">
            <Heading pb={2}>{headerValue}</Heading>
            <RatingStars edit={false} value={4} />
          </Flex>
          <HStack>
            {tags.map((tag, index) => {
              return (
                <Tag key={index} bgColor="#D9D9D9">
                  {tag}
                </Tag>
              );
            })}
          </HStack>
        </ModalHeader>

        <ModalBody mx={6}>
          <Flex flexDirection="column">
            <Flex justifyContent="space-between">
              <ModalImage src={image} />
              <ModalImage src={image} />
              <ModalImage src={image} />
            </Flex>
            <Flex mt={6} justifyContent="space-between">
              <Text flexBasis="sm" fontSize="sm">
                {description}
              </Text>
              <Button
                bgColor="#D9D9D9"
                alignSelf="end"
                onClick={onClose}
                size="lg"
                rounded={16}
              >
                Add to Plan
              </Button>
            </Flex>
            <Flex justifyContent="space-between" maxWidth="sm" my={3}>
              <Text fontSize="sm" fontWeight="bold">
                Commented on{" "}
                <Text
                  as="span"
        
                  color="#FFD600"
                  fontWeight="bold"
                >
                  Sept. 20. 2022
                </Text>
              </Text>
              <Button variant="link" alignSelf="end" color="#0065C1">
                Edit
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default CardModal;
