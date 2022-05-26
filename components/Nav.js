/** @format */

import Link from "next/link";

import styles from "./Nav.module.css";

export default function Nav() {
	return (
		<nav className={styles.nav}>
			<ul className={styles.list}>
				<li className={styles.item}>
					<Link href='/'>
						<a className='text-xl px-4 py-2'>Home</a>
					</Link>
				</li>
				<li>
					<Link href='/add-post'>
						<a className='text-xl px-4 py-1 border rounded-xl bg-cyan-500 hover:bg-cyan-300'>
							Add post
						</a>
					</Link>
				</li>
			</ul>
		</nav>
	);
}
