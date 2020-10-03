const base = require("../../base");
const Property = require("../../models/property")
module.exports.addProperty = async (res) => {
 const {type, size, noOfRooms, location, reason,images} = res.body;
 // checks for the local variables of the function
 if(!type || !size  || !location ||!images || images.length === 0) throw new base.ResponseError(400, "Size,type of house, no of rooms, location and images of property are compulsory fields");
 if(!location.state || location.state.length === 0) throw new base.ResponseError(400, "State was not provided.");
 if(!location.street || location.street.length === 0) throw new base.ResponseError(400, "Street was not provided.");
 if(!location.landmark || location.landmark.length === 0) throw new base.ResponseError(400, "land mark was not provided.");
 const property = new Property({type, size, noOfRooms, location, reason,images});
 await property.save().catch(e => {throw new base.ResponseError(400, e.message)})
 return new base.Response(201, {
    message: "Account created successfully",
    error: false
})
}