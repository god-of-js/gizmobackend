const { request } = require("express");
const base = require("../../base");
const Property = require("../../models/property")
module.exports.addProperty = async (res) => {
    const { type, size, noOfRooms, price, state, landmark, location, images, ownerId, extraComment, propertyId, furnishing, bathrooms, condition, parkingSpace } = res.body;
    // checks for the local variables of the function
    if (!ownerId) throw new base.ResponseError(400, "Owner of property must be provided.");
    if (!size) throw new base.ResponseError(400, "Size of property is a compulsory field.");
    if (!price) throw new base.ResponseError(400, "Price of property was not provided.");
    if (images.length === 0) throw new base.ResponseError(400, "Image of property was not provided.");
    if (!state) throw new base.ResponseError(400, "State was not provided.");
    if (!location) throw new base.ResponseError(400, "Location  was not provided.");
    if (!location.country) throw new base.ResponseError(400, "Country  was not provided. try selecting from the locations field.");
    if (!type) throw new base.ResponseError(400, "Provide type of property.");
    if (!landmark) throw new base.ResponseError(400, "Provide a landmark for user to locate property.");
    let property, message;
    if (propertyId) {
        property = await Property.find({ _id: propertyId });
        await Property.updateOne(
            { _id: propertyId },
            {
                $set: { type, size, noOfRooms, price, state, landmark, location, images, ownerId, extraComment, furnishing, bathrooms, condition, parkingSpace },
                $currentDate: { "lastModified": true }
            })
        property = await Property.find({ _id: propertyId });
        message = "Property edited successfully"
    }
    else {
        message = "Property added successfully"
        property = new Property({ type, size, noOfRooms, createdAt: Date.now(), price, state, landmark, location, images, ownerId, extraComment, furnishing, bathrooms, condition, parkingSpace });
    }
    await property.save().catch(e => { throw new base.ResponseError(400, e.message) })
    return new base.Response(201, {
        message: message,
        error: false
    })
}
module.exports.getProperties = async (request) => {
    const { id } = request.payload
    if (!id) throw new base.ResponseError(400, "Id of user must be provided.")
    const properties = await Property.find({ ownerId: id }).exec();
    return new base.Response(201, {
        message: "Properties fetch successful",
        error: false,
        data: properties
    })
}
module.exports.getProperty = async (request) => {
    const id = request.params.id;
    if (!id) throw new base.ResponseError(400, "Id of user must be provided.")
    const property = await Property.findOne({ _id: id });
    if (!property) throw new base.ResponseError(404, "Property not found")
    return new base.Response(201, {
        message: "Property found",
        error: false,
        data: property
    })
}
module.exports.deleteProperty = async (request) => {
    const {propId, ownerId} = request.body;
    let id = propId;
    const owner = await Property.find({_id: id})
    if(owner[0].ownerId !== ownerId) throw new base.ResponseError(400, "You do not have the priviledge to delete this property")
    const property = await Property.findByIdAndDelete(id)
    .catch(err => {throw new base.ResponseError(404, err.message)})
    return new base.Response(201, {
        message: "Property deleted",
        error: false
    })
}
module.exports.getAllProperties = async request => {

    const properties = await Property.find({})
    return new base.Response(201, {
        message: "Properties fetch successful",
        error: false,
        data: properties.slice(request.params.page, 20)
    })
}