/** @format */

import Head from "next/head";

import Nav from "../components/Nav";
import PostCard from "../components/PostCard";
import styles from "../styles/Home.module.css";

export default function Home({ posts }) {
	return (
		<div>
			<Head>
				<title>Home</title>
			</Head>

			<Nav />
			<div className='w-6/12 mx-auto my-4'>
				<h2 className='text-xl font-bold text-center mt-10'>
					A Next JS Blog Site with MongoDB Atlas
				</h2>
			</div>
			<main className='w-6/12 mx-auto border rounded-xl'>
				<div className={styles.container}>
					{posts.length === 0 ? (
						<h2>No added posts</h2>
					) : (
						<ul className='flex flex-row gap-4 flex-wrap'>
							{posts.map((post, i) => (
								<li key={i} className='border p-2 rounded-xl'>
									<PostCard post={post} />
								</li>
							))}
						</ul>
					)}
				</div>
			</main>
		</div>
	);
}

export async function getServerSideProps(ctx) {
	// get the current environment
	let dev = process.env.NODE_ENV !== "production";
	let { DEV_URL, PROD_URL } = process.env;

	// request posts from api
	let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/posts`);
	// extract the data
	let data = await response.json();

	return {
		props: {
			posts: data["message"],
		},
	};
}
