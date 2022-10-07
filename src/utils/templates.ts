import { Card as CardType, Plan as PlanType } from "./types";

export const createTemplateCard = (): CardType => {
  const card: CardType = {
    imageSrc: "www.defaulturl.com",
    title: "Default Title",
    comments: ["Lorem ipsum dolor"],
    tags: ["tag1", "tag2", "tag3"],
  };
  return card;
};

export const createTemplatePlan = (): PlanType => {
  const templateCard1 = createTemplateCard();
  const templateCard2 = createTemplateCard();

  const plan: PlanType = {
    cards: [templateCard1, templateCard2],
    comments: "default comments",
  };
  return plan;
};
