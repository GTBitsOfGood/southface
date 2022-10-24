import ReactStars from "react-rating-stars-component";
import { MdOutlineStarRate } from "react-icons/md";

/**
 * This component comes from react-rating-stars (https://www.npmjs.com/package/react-rating-stars-component).
 *
 * @param {number} value => The number of filled in stars
 * @param {boolean} edit => whether the stars are readonly or editable.
 */
const RatingStars = ({ value, edit }) => {
  return (
    <ReactStars
      count={5}
      size={16}
      activeColor="#ffd700"
      edit={edit}
      value={value}
      emptyIcon={<MdOutlineStarRate />}
    />
  );
};

export default RatingStars;
