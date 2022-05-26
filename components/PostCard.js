/** @format */

import { useState } from "react";
import { useRouter } from "next/router";

export default function PostCard({ post }) {
	const [publishing, setPublishing] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const router = useRouter();

	// Publish post
	const publishPost = async (postId) => {
		// change publishing state
		setPublishing(true);

		try {
			// Update post
			await fetch("/api/posts", {
				method: "PUT",
				body: postId,
			});

			// reset the publishing state
			setPublishing(false);

			// reload the page
			return router.push(router.asPath);
		} catch (error) {
			// Stop publishing state
			return setPublishing(false);
		}
	};
	// Delete post
	const deletePost = async (postId) => {
		//change deleting state
		setDeleting(true);

		try {
			// Delete post
			await fetch("/api/posts", {
				method: "DELETE",
				body: postId,
			});

			// reset the deleting state
			setDeleting(false);

			// reload the page
			return router.push(router.asPath);
		} catch (error) {
			// stop deleting state
			return setDeleting(false);
		}
	};
	return (
		<>
			<li>
				<h3 className='text-2xl my-2 font-bold text-center'>{post.title}</h3>
				<p className='text-xl my-2 text-justify'>{post.content}</p>
				<small className='border-b-2'>
					{new Date(post.createdAt).toLocaleDateString()}
				</small>
				<br />
				{!post.published ? (
					<button
						className='border p-2 rounded-xl m-2 bg-blue-500'
						type='button'
						onClick={() => publishPost(post._id)}>
						{publishing ? "Publishing" : "Publish"}
					</button>
				) : null}
				<button
					className='border p-2 rounded-xl m-2 bg-red-500'
					type='button'
					onClick={() => deletePost(post["_id"])}>
					{deleting ? "Deleting" : "Delete"}
				</button>
			</li>
		</>
	);
}
