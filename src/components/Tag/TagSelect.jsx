import { CloseIcon } from "@chakra-ui/icons";
import { AbsoluteCenter, Button, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { deleteTag } from "../../actions/Tag";
import urls from "../../lib/utils/urls";
import CheckboxArrayControl from "../FormComponents/CheckboxArrayControl";
import ConfirmActionModal from "../Modals/ConfirmActionModal";

const TagSelect = ({ tag }) => {
  const [hover, setHover] = useState(false);

  const { mutate } = useSWRConfig();

  const removeTagFromDatabase = async () => {
    await deleteTag(tag.id);
    mutate(urls.api.tag.getObject);
  };

  const updateTags = async () => {
    await removeTagFromDatabase();
    onCloseDeleteModal();
  };

  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();

  return (
    <div
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <CheckboxArrayControl
        key={tag._id}
        name="tagArray"
        value={tag.name}
        style={{
          w: "100%",
          textTransform: "capitalize",
          fontSize: { base: "0.8em", "2xl": "1em" },
          fontFamily: "'Europa-Regular', sans-serif",
        }}
      >
        {tag.name}
        {hover && (
          <AbsoluteCenter
            right="-1.35rem"
            bg="transparent"
            p="1"
            axis="vertical"
          >
            <Button
              minWidth="15px"
              minHeight="15px"
              height="15px"
              width="15px"
              backgroundColor="transparent"
              color="none"
              rounded="full"
              _hover={{ bg: "#E2E3E5" }}
              onClick={onOpenDeleteModal}
              padding="0"
            >
              <CloseIcon h={1.5} w={1.5} color="#515254" />
            </Button>
          </AbsoluteCenter>
        )}
        <ConfirmActionModal
          isOpen={isOpenDeleteModal}
          onClose={onCloseDeleteModal}
          mainText="Are you sure you want to delete this tag?"
          subText="Deleting a tag will remove the tag from all of its linked standard cards."
          confirmButtonText="Yes, delete tag"
          cancelButtonText="No, return to add standard"
          handleAction={updateTags}
          isDanger={true}
        />
      </CheckboxArrayControl>
    </div>
  );
};

export default TagSelect;
