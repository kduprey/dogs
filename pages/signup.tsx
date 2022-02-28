import {
	AuthError,
	createUserWithEmailAndPassword,
	getAuth,
} from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import mapAuthCodeToMessage from "../firebase/authErrorMsg";
import app from "../firebase/clientApp";

type Props = {};

const SignUp = (props: Props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [verifyPassword, setVerifyPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(
		undefined as AuthError | string | undefined
	);

	const auth = getAuth(app);
	const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (password !== verifyPassword) {
			setError("Passwords do not match");
			setIsLoading(false);
			return;
		}
		setIsLoading(true);
		setError(undefined);
		createUserWithEmailAndPassword(auth, email, password)
			.then(() => {
				console.log("Logged in!");
				setIsLoading(false);
			})
			.catch((error: AuthError) => {
				setError(error);
				setIsLoading(false);

				console.log(error);
			});
	};

	return (
		<main className="flex flex-col items-center justify-center h-screen">
			<div className="shadow-lg flex flex-col bg-slate-50 rounded-lg p-8 w-3/4 sm:w-1/2 justify-center items-center">
				<div className="flex flex-col justify-center items-center space-y-3">
					<Link href={"/"} passHref>
						<h1 className="hover:underline">Dogs or Cats?</h1>
					</Link>
					<p className="text-slate-700">Create an account</p>
				</div>
				<form
					className="flex flex-col items-center justify-center sm:w-3/4 pb-3"
					onSubmit={onFormSubmit}
				>
					<p
						className={`${
							error
								? "opacity-100 h-full w-full p-2"
								: "opacity-0 w-0 h-0 "
						} text-red-600 bg-red-100 rounded-xl font-light text-center transition-all ease-in-out duration-500`}
					>
						{error
							? typeof error === "string"
								? error
								: mapAuthCodeToMessage(error.code)
							: ""}
					</p>

					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						name="email"
						placeholder="Email"
						required
					/>
					<input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						name="password"
						placeholder="Password"
						required
					/>
					<input
						value={verifyPassword}
						onChange={(e) => setVerifyPassword(e.target.value)}
						type="password"
						name="verifyPassword"
						placeholder="Confirm Password"
						required
					/>
					<button
						type="submit"
						className={isLoading ? "flex text-slate-300" : ""}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="none"
							viewBox="0 0 24 24"
							className={`${
								isLoading
									? "mr-1 animate-spin text-slate-500"
									: "opacity-0 w-0 h-0 "
							} transition-all ease-in-out duration-200`}
						>
							<path
								fill="currentColor"
								fillRule="evenodd"
								d="M12 19a7 7 0 100-14 7 7 0 000 14zm0 3c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
								clipRule="evenodd"
								opacity="0.2"
							></path>
							<path
								fill="currentColor"
								d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 00-7 7H2z"
							></path>
						</svg>
						{isLoading ? "Loading..." : "Sign up"}
					</button>
				</form>
				<hr />
				<div className="flex flex-col justify-center items-center space-y-3 pt-3">
					<p>Have an account already?</p>
					<Link passHref href={"/signin"}>
						<button>
							<a>Sign In</a>
						</button>
					</Link>
				</div>
			</div>
		</main>
	);
};

export default SignUp;
