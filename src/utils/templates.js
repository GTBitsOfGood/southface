export const createTemplateCard = () => {
  const card = {
    images: ["www.defaulturl.com"],
    title: "Default Title",
    comments: [
      {
        body: "Lorem ipsum dolor",
        date: new Date(),
      },
    ],
    tags: ["tag1", "tag2", "tag3"],
  };
  return card;
};

export const createTemplatePlan = () => {
  const templateCard1 = createTemplateCard();
  const templateCard2 = createTemplateCard();

  const plan = {
    userId: "id",
    cards: [templateCard1, templateCard2],
    name: "default name",
  };
  return plan;
};
