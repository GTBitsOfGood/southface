import mongoDB from "../index";
import Card from "../models/Card";

export async function createCard({ userId, imageSrc, title, body, tags }) {
    await mongoDB();

    return Card.create({
        userId,
        imageSrc,
        title,
        body,
        tags,
    }, function (err, docs) {
        if (err){
            console.log(err)
        }
        else {
            console.log("Created Card: ", docs);
        }
    });
}

export async function updateCardById({ id, userId, imageSrc, title, body, tags }) {
    await mongoDB();

    Card.findOneAndUpdate({_id: id, userId: userId}, { 
        imageSrc: imageSrc, 
        title: title, 
        body: body, 
        tags: tags
    }, function (err, docs) {
        if (err){
            console.log(err)
        }
        else {
            console.log("Updated Card: ", docs);
        }
    });
}

export async function deleteCardById({ id, userId }) {
    await mongoDB();

    Card.findOneAndRemove({_id: id, userId: userId}, function (err, docs) {
        if (err){
            console.log(err)
        }
        else {
            console.log("Deleted Card: ", docs);
        }
    });
}

export async function getCards(userId) {
    await mongoDB();

    return Card.find({userId: userId}, function (err, docs) {
        if (err){
            console.log(err)
        }
        else {
            console.log("Returned All Cards: ", docs);
        }
    });
}
