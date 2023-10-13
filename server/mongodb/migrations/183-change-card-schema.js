/*
This file contains the procedure to refactor the cards collection. For each card, the array of building type names is replaced with their corresponding ObjectIds from the buildingType collection. 
*/
var db = connect(uri);

var cards = db.cards.find().toArray();
var buildingTypes = db.buildingtypes.find().toArray();

var buildingTypeMap = {};
buildingTypes.forEach((type) => {
  buildingTypeMap[type.name] = type._id;
});

cards.forEach((card) => {
  var buildingTypeIds = card.buildingType.map((typeName) => {
    return buildingTypeMap[typeName];
  });
  db.cards.updateOne(
    { _id: card._id },
    { $set: { buildingType: buildingTypeIds } }
  );
  var updatedCard = db.cards.findOne({ _id: card._id });
  printjson(updatedCard);
});

print("Cards collection updated successfully!");
