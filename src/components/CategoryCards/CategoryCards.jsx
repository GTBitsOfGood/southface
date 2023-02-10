import { primaryCategoryNames } from "../../lib/utils/constants";
import CategoryCard from "./CategoryCard";

function CategoryCards(props) {
  return (
    <>
      {Object.keys(primaryCategoryNames).map((categoryInitials) => {
        const name = primaryCategoryNames[categoryInitials].trim();
        return (
          <CategoryCard
            routerQuery={props.routerQuery}
            initials={categoryInitials}
            title={name}
            key={name}
          />
        );
      })}
    </>
  );
}

export default CategoryCards;
