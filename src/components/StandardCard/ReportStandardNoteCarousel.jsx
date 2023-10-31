import useUser from "../../lib/hooks/useUser";
import Notes from "../Notes/Notes";

const ReportStandardNotes = ({
  notes,
  cardWrapper,
  card,
  /* selState, */ ...rest
}) => {
  const { user } = useUser();
  const notesFilter = (note /* , index */) =>
    // selState?.noteSelections[index] &&
    user.isAdmin || note.userId === user.id;
  return (
    <Notes
      notes={notes.filter(notesFilter)}
      cardWrapper={cardWrapper}
      cardId={card._id}
      inReport={true}
      notesVariant={"report"}
      {...rest}
    />
  );
};

export default ReportStandardNotes;
