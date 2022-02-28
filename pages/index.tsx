import { getAuth } from "firebase/auth";
import {
	collection,
	doc,
	getDocs,
	getFirestore,
	setDoc,
} from "firebase/firestore";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import app from "../firebase/clientApp";

const Home: NextPage = () => {
	const auth = getAuth(app);
	const db = getFirestore(app);
	const [user, loading, error] = useAuthState(auth);
	const [votes, votesLoading, votesError] = useCollection(
		collection(db, "votes"),
		{}
	);

	if (!votesLoading && votes) {
		votes.docs.map((doc) => {
			console.log(doc.data());
		});
	}

	const addVoteDocument = async (vote: string) => {
		if (user) await setDoc(doc(db, "votes", user.uid), { vote });
	};

	return (
		<main>
			<Head>
				<title>Dogs</title>
				<meta name="description" content="Test app with Firebase" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="flex flex-col justify-center items-center space-y-3 pt-[25vh]">
				<div className="bg-slate-200 rounded-lg p-3 flex flex-col justify-center items-center space-y-3">
					<h1 className="text-center text-3xl">Dogs or cats?</h1>
					<p>Choose below!</p>
				</div>

				<div className="flex flex-col justify-center items-center space-y-3">
					<h3>
						Dog Lovers:{" "}
						{
							votes?.docs?.filter((doc) => {
								return doc.data().vote === "Dogs";
							}).length
						}
					</h3>
					<h3>
						Cat Lovers:{" "}
						{
							votes?.docs.filter((doc) => {
								return doc.data().vote === "Cats";
							}).length
						}
					</h3>
				</div>
				<div className="flex justify-evenly items-center w-full">
					<button
						className="choice"
						onClick={() => addVoteDocument("Dogs")}
						{...(user ? {} : { disabled: true })}
					>
						Dogs
					</button>
					<button
						className="choice"
						{...(user ? {} : { disabled: true })}
						onClick={() => addVoteDocument("Cats")}
					>
						Cats
					</button>
				</div>

				<div className="">
					{user && !loading ? (
						<div>
							<p>{user.displayName}</p>
							<Link href="/profile">
								<a className="text-center">
									<button className="">Profile</button>
								</a>
							</Link>
							<button
								onClick={(e) => {
									auth.signOut();
								}}
							>
								Sign Out
							</button>
						</div>
					) : (
						<div className="flex justify-center items-center space-x-3">
							<Link href={"/signin"} passHref>
								<a>
									<button>Sign In</button>
								</a>
							</Link>
							<p>or</p>

							<Link href={"/signup"} passHref>
								<a>
									<button>Sign Up</button>
								</a>
							</Link>
						</div>
					)}
				</div>
			</div>
		</main>
	);
};

export default Home;
