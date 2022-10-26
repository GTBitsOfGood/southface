import {
  AddIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import {
  Box,
  HStack,
  IconButton,
  Input,
  SimpleGrid,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import AddCommentModal from "./Modals/EditCommentModals/AddCommentModal";
import DeleteCommentModal from "./Modals/EditCommentModals/DeleteCommentModal";

const Comments = React.forwardRef(
  ({ isEditing, cardId, comments, handleCommentsUpdate, mt, mb }, ref) => {
    // comments are shown in reverse order of creation date
    const [currCommentIdx, setCurrCommentIdx] = useState(comments.length - 1);

    const {
      isOpen: isAddOpen,
      onOpen: onAddOpen,
      onClose: onAddClose,
    } = useDisclosure();
    const {
      isOpen: isDeleteOpen,
      onOpen: onDeleteOpen,
      onClose: onDeleteClose,
    } = useDisclosure();

    const nextComment = () => {
      setCurrCommentIdx(currCommentIdx - 1);
    };

    const lastComment = () => {
      setCurrCommentIdx(currCommentIdx + 1);
    };

    const getValue = () => {
      if (isEditing) {
        return comments[currCommentIdx].body;
      } else {
        if (comments.length == 0) {
          return "No Comments Yet";
        }
        return `"${comments[currCommentIdx].body}"`;
      }
    };

    return (
      <SimpleGrid columns={1} mt={mt || 2} mb={mb || 2} spacing={2}>
        <Box>
          <Input
            flexBasis="sm"
            fontSize="sm"
            variant={isEditing ? "outline" : "unstyled"}
            isReadOnly={!isEditing}
            onChange={(e) =>
              handleCommentsUpdate(e, comments[currCommentIdx]._id)
            }
            value={getValue()}
            ref={ref}
            placeholder="Add Card Comments"
          />
          <Text fontSize="sm">
            {comments.length > 0 ? `-- Commented on ${" "}` : ""}
            <Text as="span" color="#FFD600" fontWeight="bold">
              {comments.length > 0
                ? new Date(comments[currCommentIdx].date).toDateString()
                : ""}
            </Text>
          </Text>
        </Box>
        <Box>
          <HStack>
            {comments.length > 0 && (
              <>
                <IconButton
                  icon={<ArrowLeftIcon />}
                  size="xs"
                  _hover={{
                    bg: currCommentIdx == comments.length - 1 ? "#D9D9D9" : "",
                  }}
                  disabled={currCommentIdx == comments.length - 1}
                  bgColor="#D9D9D9"
                  onClick={lastComment}
                />
                <IconButton
                  icon={<ArrowRightIcon />}
                  size="xs"
                  _hover={{
                    bg: currCommentIdx == comments.length - 1 ? "#D9D9D9" : "",
                  }}
                  disabled={currCommentIdx == 0}
                  bgColor="#D9D9D9"
                  onClick={nextComment}
                />
              </>
            )}
            <IconButton
              icon={<AddIcon />}
              size="xs"
              minWidth="0"
              rounded="full"
              variant="link"
              onClick={onAddOpen}
            />
            <AddCommentModal
              isOpen={isAddOpen}
              onClose={onAddClose}
              comments={comments}
              cardId={cardId}
            />
            {comments.length > 0 && (
              <>
                <IconButton
                  icon={<DeleteIcon />}
                  size="xs"
                  rounded="full"
                  variant="link"
                  onClick={onDeleteOpen}
                />
                <DeleteCommentModal
                  isOpen={isDeleteOpen}
                  onClose={onDeleteClose}
                  comments={comments}
                  currCommentIdx={currCommentIdx}
                  cardId={cardId}
                />
                <Spacer />
                <Text alignSelf="end" fontSize="sm">
                  {comments.length - currCommentIdx} of {comments.length}
                </Text>
              </>
            )}
          </HStack>
        </Box>
      </SimpleGrid>
    );
  }
);

Comments.displayName = "Comments";

export default Comments;
