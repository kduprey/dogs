const mapAuthCodeToMessage = (authCode: string) => {
	switch (authCode) {
		case "auth/invalid-password":
			return "Password is not correct, please try again";

		case "auth/wrong-password":
			return "Password is not correct, please try again";

		case "auth/invalid-email":
			return "Email provided is invalid, please try again";

		case "auth/email-already-exists":
			return "Email already exists, please sign in";

		case "auth/internal-error":
			return "Internal server error, please try again later";

		case "auth/invalid-phone-number":
			return "Phone number provided is invalid, please try again";

		case "auth/phone-number-already-exists":
			return "Phone number already exists, please login";

		case "auth/user-not-found":
			return "Email provided does not exist, please sign up";

		default:
			return "";
	}
};

export default mapAuthCodeToMessage;
