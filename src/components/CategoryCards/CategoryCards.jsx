import { primaryCategoryNames } from "../../lib/utils/constants";
import CategoryCard from "./CategoryCard";

function CategoryCards(props) {
  return (
    <>
      {Object.keys(primaryCategoryNames).map((categoryInitials) => {
        const name = primaryCategoryNames[categoryInitials];
        const newCategoryParts = name.split("(");
        const newCategoryName = newCategoryParts[0].trim();
        return (
          <CategoryCard
            routerQuery={props.routerQuery}
            initials={categoryInitials}
            title={newCategoryName}
            key={newCategoryName}
          />
        );
      })}
    </>
  );
}

export default CategoryCards;
