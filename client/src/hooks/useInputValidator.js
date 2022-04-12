export const ValidatorTypes = {
	USERNAME: "username",
	PASSWORD: "password",
	EMAIL: "email",
	DEFAULT: "",
};

const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^$/;

const Validators = {
	[ValidatorTypes.USERNAME]: {
		validator: (value) => USERNAME_REGEX.test(value),
		note: "4 to 24 characters.\nMust begin with a letter.\nLetters, numbers, underscores, hyphens allowed.",
	},
	[ValidatorTypes.PASSWORD]: {
		validator: (value) => PASSWORD_REGEX.test(value),
		note: "8 to 28 characters.\nMust include an uppercase and a lowercase letter, a number and a special character.\nAllowed special characters: ! @ # $ %.",
	},
	[ValidatorTypes.EMAIL]: {
		validator: (value) => true,
		note: "Enter valid email address.",
	},
	[ValidatorTypes.DEFAULT]: {
		validator: () => true,
		note: "",
	},
};

const useInputValidator = (type) => {
	return Validators[type || ValidatorTypes.DEFAULT];
};

export default useInputValidator;
