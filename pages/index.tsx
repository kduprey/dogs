import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
	return (
		<body>
			<Head>
				<title>Dogs</title>
				<meta name="description" content="Test app with Firebase" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<h1 className="text-center text-3xl p-[50vh]">Hello!</h1>
			</main>
		</body>
	);
};

export default Home;
