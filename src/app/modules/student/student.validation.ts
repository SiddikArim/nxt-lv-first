import Joi from "joi";

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .min(2)
    .max(15)
    .pattern(/^[A-Z][a-z]*$/, { name: "capitalized" })
    .messages({
      "string.pattern.base": "{#label} should start with a capital letter",
    }),
  lastName: Joi.string().required(),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNumber: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNumber: Joi.string().required(),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNumber: Joi.string().required(),
  address: Joi.string().required(),
});

const studentValidationSchema = Joi.object({
  id: Joi.number().required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid("male", "female", "others").required(),
  contactNumber: Joi.string().required(),
  emergencyNumber: Joi.string().required(),
  dateOfBirth: Joi.string().required(),
  email: Joi.string().email().required(),
  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .required(),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImage: Joi.string(),
  isActive: Joi.string().valid("active", "block").default("active"),
});

export default studentValidationSchema;
