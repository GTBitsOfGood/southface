import useUser from "../../lib/hooks/useUser";
import Notes from "../Notes/Notes";

const ReportStandardNotes = ({ notes, card, selState, ...rest }) => {

  const { user } = useUser();
  const notesFilter = (note, index) =>
    selState?.noteSelections[index] &&
    (user.isAdmin || note.userId === user.id);
  console.log(user);
  return (
    <Notes
      notes={notes.filter(notesFilter)}
      cardId={card._id}
      notesVariant={"report"}
      {...rest}
    />
  );
};

export default ReportStandardNotes;
