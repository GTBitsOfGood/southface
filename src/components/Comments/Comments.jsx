import {
  AddIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";
import {
  Box,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Spacer,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import useUser from "src/lib/hooks/useUser";
import { updateCardById } from "../../actions/Card";
import AddCommentModal from "../Modals/EditCommentModals/AddCommentModal";
import DeleteCommentModal from "../Modals/EditCommentModals/DeleteCommentModal";

const Comments = ({
  canEdit,
  cardId,
  comments,
  handleCommentsUpdate,
  setComments,
  setCards,
  mt,
  mb,
}) => {
  // comments are shown in reverse order of creation date
  const [currCommentIdx, setCurrCommentIdx] = useState(comments.length - 1);
  const [isEditing, setIsEditing] = useState(false);

  const commentRef = useRef();
  const unauthorizedToast = useToast();
  const { user } = useUser();

  useEffect(() => {
    setCurrCommentIdx(comments.length - 1);
  }, [comments]);

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

  const handleEditing = () => {
    if (!user || !user.isAdmin) {
      unauthorizedToast({
        title: "Unauthorized!",
        description: "You must log in as an admin.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setIsEditing(true);
    commentRef.current.focus();
  };

  const handleDeleting = () => {
    if (!user || !user.isAdmin) {
      unauthorizedToast({
        title: "Unauthorized!",
        description: "You must log in as an admin.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    onDeleteOpen();
  };

  const handleAdding = () => {
    if (!user || !user.isAdmin) {
      unauthorizedToast({
        title: "Unauthorized!",
        description: "You must log in as an admin.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    onAddOpen();
  };

  const handleSaveEdit = async () => {
    const updatedCard = await updateCardById(cardId, { comments }, true);
    setCards((cards) => {
      return cards.map((card) => {
        if (cardId === card._id) {
          return updatedCard;
        } else {
          return card;
        }
      });
    });
    setIsEditing(false);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  const getValue = () => {
    if (isEditing) {
      if (comments.length == 0) {
        return "";
      }
      return comments[currCommentIdx].body;
    } else {
      if (comments.length == 0) {
        return "No Comments Yet";
      }
      return `"${comments[currCommentIdx].body}"`;
    }
  };
  // Prevent rendering nonexisting comments
  if (comments[currCommentIdx] === undefined) {
    return "No Comments Yet";
  }
  return (
    <SimpleGrid columns={1} mt={mt || 2} mb={mb || 2} spacing={2}>
      <Box>
        <InputGroup>
          <Input
            flexBasis="sm"
            fontSize="sm"
            pr="60px"
            variant={isEditing ? "outline" : "unstyled"}
            isReadOnly={!isEditing}
            onChange={(e) =>
              handleCommentsUpdate(e, comments[currCommentIdx]._id)
            }
            ref={commentRef}
            value={getValue()}
            placeholder="Add Card Comments"
          />
          {isEditing && (
            <InputRightElement width="60px">
              <>
                <IconButton
                  icon={<CheckIcon />}
                  marginRight="1"
                  size="xs"
                  rounded="full"
                  bgColor="green"
                  color="black"
                  onClick={handleSaveEdit}
                />
                <IconButton
                  icon={<CloseIcon />}
                  size="xs"
                  rounded="full"
                  bgColor="red"
                  color="black"
                  onClick={handleClose}
                />
              </>
            </InputRightElement>
          )}
        </InputGroup>

        {!isEditing && (
          <Text fontSize="sm">
            {comments.length > 0 ? `-- Commented on ${" "}` : ""}
            <Text as="span" color="#FFD600" fontWeight="bold">
              {comments.length > 0
                ? new Date(comments[currCommentIdx].date).toDateString()
                : ""}
            </Text>
          </Text>
        )}
      </Box>
      <Box>
        <HStack>
          {comments.length > 0 && (
            <>
              <IconButton
                icon={<ArrowLeftIcon />}
                size="sm"
                _hover={{
                  bg: currCommentIdx == comments.length - 1 ? "#D9D9D9" : "",
                }}
                isDisabled={currCommentIdx == comments.length - 1}
                bgColor="#D9D9D9"
                onClick={lastComment}
              />
              <IconButton
                icon={<ArrowRightIcon />}
                size="sm"
                _hover={{
                  bg: currCommentIdx == comments.length - 1 ? "#D9D9D9" : "",
                }}
                isDisabled={currCommentIdx == 0}
                bgColor="#D9D9D9"
                onClick={nextComment}
              />
            </>
          )}

          {comments.length > 0 && canEdit != false && (
            <>
              <IconButton
                icon={<AddIcon />}
                size="sm"
                rounded="full"
                onClick={handleAdding}
              />
              <AddCommentModal
                isOpen={isAddOpen}
                onClose={onAddClose}
                comments={comments}
                cardId={cardId}
                setComments={setComments}
                setCurrCommentIdx={setCurrCommentIdx}
                setCards={setCards}
              />
              <IconButton
                icon={<EditIcon />}
                size="sm"
                rounded="full"
                onClick={handleEditing}
              />

              <IconButton
                icon={<DeleteIcon />}
                size="sm"
                rounded="full"
                onClick={handleDeleting}
              />
              <DeleteCommentModal
                isOpen={isDeleteOpen}
                onClose={onDeleteClose}
                comments={comments}
                currCommentIdx={currCommentIdx}
                cardId={cardId}
                setComments={setComments}
                setCurrCommentIdx={setCurrCommentIdx}
                setCards={setCards}
              />
            </>
          )}

          {comments.length > 0 && (
            <>
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
};

Comments.displayName = "Comments";

export default Comments;
