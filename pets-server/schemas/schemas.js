const petSchema = {
  type: "object",
  properties: {
    type: {
      type: "string",
      enum: ["Dog", "Cat"]
    },
    name: { type: "string" },
    adoptionStatus: {
      type: "string",
      enum: ["Adopted", "Fostered", "Available"]
    },
    imageUrl: { type: "string" },
    height: { type: "number" },
    weight: { type: "number" },
    color: { type: "string" },
    bio: { type: "string" },
    hypoallergenic: { type: "boolean" },
    dietaryRestrictions: { type: "string" },
    breed: { type: "string" },
    ownerId: { type: "string", format: "uuid" }, 
    savedBy: {
      type: "array",
      items: { type: "string", format: "uuid" } 
    }
  },
  required: ["type", "name", "adoptionStatus", "height", "weight"],
  additionalProperties: false
};



const signupSchema = {
  type: "object",
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string" },
    phone: { type: "string" }, 
    password: { type: "string" },
    rePassword: { type: "string" },
    bio: { type: "string" }
  },
  required: ["firstName", "lastName", "email", "phone", "password", "rePassword"],
  additionalProperties: false
};


const loginSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
  required: ["email", "password"],
  additionalProperties: false
}

module.exports = { petSchema, signupSchema, loginSchema }