import { categoryNames } from "../../../server/mongodb/models/Card";
import CategoryCard from "./CategoryCard";

function CategoryCards(props) {
  return (
    <>
      {categoryNames.map((category) => {
        const newCategoryParts = category.split("(");
        const newCategoryName = newCategoryParts[0].trim();
        const initials = newCategoryParts[1].split(")")[0];
        return (
          <CategoryCard
            routerQuery={props.routerQuery}
            initials={initials}
            title={newCategoryName}
            key={newCategoryName}
          />
        );
      })}
    </>
  );
}

export default CategoryCards;
