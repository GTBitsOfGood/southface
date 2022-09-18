import mongoDB from "../index.js";
import Card from "../models/Card";

export async function createCard({ imageSrc, title, body, tags }) {
    await mongoDB();

    return Card.create({
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

export async function updateCardByID({ id, imageSrc, title, body, tags }) {
    await mongoDB();

    Card.findByIdAndUpdate(id, { 
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

export async function deleteCardByID({ id }) {
    await mongoDB();

    Card.findByIdAndRemove(id, function (err, docs) {
        if (err){
            console.log(err)
        }
        else {
            console.log("Deleted Card: ", docs);
        }
    });
}

export async function getCards() {
    await mongoDB();

    Card.find({}, function (err, docs) {
        if (err){
            console.log(err)
        }
        else {
            console.log("Returned All Cards: ", docs);
        }
    });
}

export async function getCardByID({ id }) {
    await mongoDB();

    Card.find({ _id: id }, function (err, docs) {
        if (err){
            console.log(err)
        }
        else {
            console.log("Found Card: ", docs);
        } 
    });
}