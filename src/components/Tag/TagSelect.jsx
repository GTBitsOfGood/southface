import CheckboxArrayControl from "../FormComponents/CheckboxArrayControl";

const TagSelect = ({ tag }) => {
  return (
    <CheckboxArrayControl
      key={tag._id}
      name="tagArray"
      value={tag.name}
      style={{
        w: "100%",
        textTransform: "capitalize",
        fontSize: { base: "0.8em", "2xl": "1em" },
      }}
    >
      {tag.name}
    </CheckboxArrayControl>
  );
};

export default TagSelect;
