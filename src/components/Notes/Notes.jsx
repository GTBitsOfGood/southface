import { Box, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { revalidate, updateCardById } from "../../actions/Card";
import useActiveReport from "../../lib/hooks/useActiveReport";
import useUser from "../../lib/hooks/useUser";
import { parseNestedPaths } from "../../lib/utils/utilFunctions";
import ModalNotes from "./ModalNotes";
import ReportNotes from "./ReportNotes";

// note on updateCard: this should be a function that takes in a card object
// and updates that card in the parent "cards" state
const Notes = ({ cardWrapper, cardId, notes, inReport = false, ...rest }) => {
  const [currentNotes, setCurrentNotes] = useState(
    notes.map((n) => n).reverse()
  );
  const [newNote, setNewNote] = useState({
    body: "",
    userId: "",
    date: new Date(),
  });

  const { user } = useUser();

  useEffect(() => {
    setCurrentNotes(notes.map((c) => c).reverse());
  }, [notes]);

  const { updateCard = () => {} } = { ...rest };

  const { changeInReport } = useActiveReport();

  const handleSaveEdit = async (newNotes) => {
    if (inReport) {
      await changeInReport({ ...cardWrapper, notes: newNotes.reverse() });
    } else {
      const updatedCard = await updateCardById(cardId, {
        notes: newNotes.map((n) => n).reverse(),
      });

      updateCard(updatedCard);

      const revalidationPaths = JSON.stringify(
        parseNestedPaths(
          "library",
          updatedCard.buildingType,
          updatedCard.primaryCategory
        )
      );

      await revalidate(revalidationPaths);
    }
  };

  const createNewNote = async () => {
    if (newNote.body === "") {
      return;
    }
    const newNotes = notes.concat(newNote);

    if (inReport) {
      await changeInReport({ ...cardWrapper, notes: newNotes });
    } else {
      const updatedCard = await updateCardById(cardId, {
        notes: newNotes,
      });
      updateCard(updatedCard);

      const revalidationPaths = JSON.stringify(
        parseNestedPaths(
          "library",
          updatedCard.buildingType,
          updatedCard.primaryCategory
        )
      );

      await revalidate(revalidationPaths);
    }
  };

  const { selState } = { ...rest };
  const noteArr = (function () {
    if (selState && selState.noteSelections.length === notes.length) {
      return selState.noteSelections;
    } else {
      return Array(notes.length).fill(false);
    }
  })();
  const { editing, setEditing } = { ...rest };
  const editHandler = () => {
    if (!selState) {
      setEditing(false);
    } else {
      setEditing((prev) => !prev);
    }
  };

  const noteToggleHandler = (index) => () => {
    if (selState && editing) {
      noteArr[index] = !noteArr[index];
      const newSel = { ...selState };
      newSel.noteSelections = noteArr;
      changeInReport(newSel);
    }
  };

  if (!user?.isLoggedIn) {
    return (
      <Box>
        <Heading size="lg" mt={3} mb={2}>
          Notes
        </Heading>
        <Text>Login to view notes</Text>
      </Box>
    );
  }

  const childProps = {
    selState,
    currentNotes,
    newNote,
    setNewNote,
    createNewNote,
    noteToggleHandler,
    editing,
    handleSaveEdit,
    editHandler,
  };

  const { notesVariant = "modal" } = { ...rest };

  return notesVariant === "modal" ? (
    <ModalNotes cardId={cardId} {...childProps} {...rest} />
  ) : (
    <ReportNotes
      createNewNote={createNewNote}
      newNote={newNote}
      setNewNote={setNewNote}
      {...childProps}
    />
  );
};

export default Notes;
