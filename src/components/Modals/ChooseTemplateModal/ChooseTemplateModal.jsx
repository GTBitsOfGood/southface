import {
  Box,
  Button,
  Header,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  Text,
} from "@chakra-ui/react";

export default function ChooseTemplateModal({
  isOpen,
  onClose,
  setFilterTags,
}) {
  const templateOptions = [
    { template: "house", tags: ["insulation", "hvac", "wiring"] },
    { template: "shed", tags: ["roofing", "wiring"] },
    { template: "gas station", tags: ["hvac", "gas", "plumbing"] },
  ];

  const TagSetter = (tags) => () => {
    const tagSet = {};
    tags.forEach((tag) => (tagSet[tag] = true));
    setFilterTags(tagSet);
    onClose();
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Choose a Template</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* {templateOptions.map((option, index) => (
            <Box key={index}>
              <Header>{option.template}</Header>
              {option.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </Box>
          ))} */}
          {templateOptions.map((option, index) => (
            <Box
              border="1px"
              mt="3"
              p="3"
              borderRadius="lg"
              cursor="pointer"
              key={index}
              onClick={TagSetter(option.tags)}
            >
              <Text fontWeight="bold">{option.template}</Text>
              {option.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </Box>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
