/** @format */

import { useState } from "react";

import Nav from "../components/Nav";
import styles from "../styles/Home.module.css";

export default function AddPost() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

	const handlePost = async (e) => {
		e.preventDefault();

		// reset error and message
		setError("");
		setMessage("");

		// fields check
		if (!title || !content) return setError("All fields are required");

		// post structure
		let post = {
			title,
			content,
			published: false,
			createdAt: new Date().toISOString(),
		};
		// save the post
		let response = await fetch("/api/posts", {
			method: "POST",
			body: JSON.stringify(post),
		});

		// get the data
		let data = await response.json();

		if (data.success) {
			// reset the fields
			setTitle("");
			setContent("");
			// set the message
			return setMessage(data.message);
		} else {
			// set the error
			return setError(data.message);
		}
	};

	return (
		<div>
			<Nav />
			<div className={styles.container}>
				<form onSubmit={handlePost} className={styles.form}>
					{error ? (
						<div className={styles.formItem}>
							<h3 className={styles.error}>{error}</h3>
						</div>
					) : null}
					{message ? (
						<div className={styles.formItem}>
							<h3 className={styles.message}>{message}</h3>
						</div>
					) : null}
					<div className={styles.formItem}>
						<label className='font-bold text-2xl mb-2 '>Title</label>
						<input
							className=' border rounded-xl'
							type='text'
							name='title'
							onChange={(e) => setTitle(e.target.value)}
							value={title}
							placeholder='Add your Title'
						/>
					</div>
					<div className={styles.formItem}>
						<label className='font-bold text-2xl mb-2 '>Content</label>
						<textarea
							className=' border rounded-xl'
							name='content'
							onChange={(e) => setContent(e.target.value)}
							value={content}
							placeholder='Post content'
						/>
					</div>
					<div className={styles.formItem}>
						<button
							className='border p-2 rounded-xl bg-violet-500 capitalize'
							type='submit'>
							Add post
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
