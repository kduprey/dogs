import { useState } from "react";
import app from "../firebase/clientApp";
import {
	signInWithEmailAndPassword,
	signInWithRedirect,
	AuthError,
	GithubAuthProvider,
	getAuth,
	GoogleAuthProvider,
} from "firebase/auth";
import "@fontsource/roboto/400.css";
import googleIcon from "../public/google_icon.svg";
import githubIcon from "../public/github_icon.png";
import Image from "next/image";

import mapAuthCodeToMessage from "../firebase/authErrorMsg";
import Link from "next/link";
import Router from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

const SignInScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(undefined as AuthError | undefined);
	const [isLoading, setIsLoading] = useState(false);
	const auth = getAuth(app);
	const [user, loading, authStateError] = useAuthState(auth);

	const githubProvider = new GithubAuthProvider();
	const googleProvider = new GoogleAuthProvider();

	if (user && !loading) {
		Router.push("/");
	}

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		setError(undefined);
		const email = e.currentTarget.email.value;
		const password = e.currentTarget.password.value;
		signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				Router.push("/");
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
		<main className="flex flex-col justify-center items-center h-screen">
			<div className="shadow-lg flex flex-col bg-slate-50 space-y-3 rounded-lg p-8 sm:w-1/2 justify-center items-center">
				<div className="flex flex-col justify-center items-center space-y-3">
					<Link href={"/"} passHref>
						<a>
							<h1 className="hover:underline">Dogs or Cats?</h1>
						</a>
					</Link>
					<p className="text-slate-700">Please sign in:</p>
				</div>
				<div className="flex flex-col justify-center items-center space-y-3 w-full">
					<button
						onClick={() => {
							signInWithRedirect(auth, googleProvider).then(
								() => {
									Router.push("/");
								}
							);
						}}
						className="bg-[hsl(217,89%,61%)] hover:bg-[hsl(217,89%,40%)] text-white font-google flex items-center justify-center space-x-3"
					>
						<Image src={googleIcon} height={30} alt="Google Logo" />
						<p>Sign in with Google</p>
					</button>
					<button
						className="flex items-center justify-center space-x-3"
						onClick={() => {
							signInWithRedirect(auth, githubProvider).then(
								() => {
									Router.push("/");
								}
							);
						}}
					>
						<Image
							src={githubIcon}
							height={25}
							width={25}
							alt="Google Logo"
						/>
						<p>Sign in with Github</p>
					</button>
				</div>

				<div className="flex flex-col items-center justify-center w-full">
					<p>or</p>
					<p
						className={`${
							error
								? "opacity-100 h-full w-full p-2"
								: "opacity-0 w-0 h-0 "
						} text-red-600 bg-red-100 rounded-xl font-light text-center transition-all ease-in-out duration-500`}
					>
						{error ? mapAuthCodeToMessage(error.code) : ""}
					</p>
					<form onSubmit={handleFormSubmit}>
						<input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							name="email"
							placeholder="Email"
							className={`${
								error ? "border-red-500" : ""
							} md:w-1/2`}
							required
						/>
						<input
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							name="password"
							placeholder="Password"
							className={`${
								error ? "border-red-500" : ""
							} md:w-1/2`}
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
							{isLoading ? "Loading..." : "Sign in"}
						</button>
					</form>
				</div>

				<hr />
				<div className="flex flex-col items-center justify-center space-y-3">
					<p className="text-slate-700">
						Don&apos;t have an account?{" "}
					</p>
					<Link href={"/signup"} passHref>
						<button>
							<a className="text-slate-700" href="/signup">
								Sign up
							</a>
						</button>
					</Link>
				</div>
			</div>
		</main>
	);
};

export default SignInScreen;
