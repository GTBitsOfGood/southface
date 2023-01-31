import CategoryCard from "./CategoryCard";

function CategoryCards() {
  return (
    <>
      <CategoryCard initials="SP" title="Site Planning" />
      <CategoryCard initials="RE" title="Resource Efficiency" />
      <CategoryCard initials="DU" title="Durability and Moisture Management" />
      <CategoryCard initials="BE" title="High Performance Building Envelope" />
      <CategoryCard initials="ES" title="Energy Efficient HVAC Systems" />
      <CategoryCard initials="IAQ" title="Indoor Air Quality" />
      <CategoryCard initials="PI" title="Plumbing and Irrigation" />
      <CategoryCard initials="LA" title="Efficient Lighting and Appliances" />
      <CategoryCard initials="EO" title="Education and Operations" />
    </>
  );
}

export default CategoryCards;
