import mongoDB from "../index";
import Card from "../models/Card";

import { Card as CardType } from "src/utils/types";

export async function createCard(card: CardType) {
    await mongoDB();

    const newCard = await Card.create(card, function (err, docs) {
        if (err){
            console.log(err)
        }
        else {
            console.log("Created Card: ", docs);
        }
    });

    return newCard;
}

export async function updateCardById(id: string, updatedCard: Partial<CardType>) {
    await mongoDB();

    await Card.findOneAndUpdate({_id: id}, updatedCard);
}

export async function deleteCardById(id: string) {
    await mongoDB();

    await Card.findOneAndRemove({_id: id });
}

export async function getCards() {
    await mongoDB();

    const cards = await Card.find({});

    return cards;
}

export async function getCardById(id: string) {
    await mongoDB();

    const card = await Card.findById(id);

    return card;
}
