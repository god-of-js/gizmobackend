const base = require("../../base");
const Property = require("../../models/property")

module.exports.addProperty = async (res) => {
 const {type, size, noOfRooms, price, state, landmark, location,images, ownerId, extraComment} = res.body;
 // checks for the local variables of the function
 if( !ownerId  ) throw new base.ResponseError(400, "Ownder of property must be provided.");
 if( !size  ) throw new base.ResponseError(400, "Size of property is a compulsory field.");
 if(!price) throw new base.ResponseError(400, "Price of property was not provided.");
 if(images.length === 0) throw new base.ResponseError(400, "Image of property was not provided.");
 if(!state) throw new base.ResponseError(400, "State was not provided.");
 if(!location) throw new base.ResponseError(400, "Location  was not provided.");
 if(!type)  throw new base.ResponseError(400, "Provide type of property.");
 if(!landmark) throw new base.ResponseError(400, "Provide a landmark for user to locate property.");
 const property = new Property({type, size, noOfRooms, price, state, landmark, location, images, ownerId, extraComment});
 await property.save().catch(e => {throw new base.ResponseError(400, e.message)})
 return new base.Response(201, {
    message: "Account created successfully",
    error: false
})
}