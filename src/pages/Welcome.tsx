import Logo from '#client/Logo';
import useGame from '@client/hooks/useGame';
import { usernameValidator } from '@client/validators/username';
import { useState } from 'react';
import { ZodError } from 'zod';
import LiveChecker from '../components/LiveChecker';

export default function Welcome() {
	const { currentPlayer, setPlayerName, logIn } = useGame();
	const [usernameError, setUsernameError] = useState<string | null>(null);
	return (
		<main className="flex flex-col items-center p-8 max-w-6xl mx-auto gap-16">
			<Logo />
			<LiveChecker />
			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text text-2xl">What is your username?</span>
				</div>
				<input
					type="text"
					name="username"
					placeholder="Type here"
					className="input input-bordered w-full max-w-xs"
					value={currentPlayer.username}
					onChange={(e) => {
						const newUsername = e.target.value;
						setPlayerName(newUsername);

						try {
							usernameValidator.parse(newUsername);
							setUsernameError(null);
						} catch (error) {
							if (error instanceof ZodError) {
								setUsernameError(error.errors[0].message);
							}
						}
					}}
				/>
				<div className="label">
					<span className="label-text-alt text-error">{usernameError}</span>
				</div>
			</label>
			<button
				className="btn btn-primary"
				onClick={() => {
					if (currentPlayer.username) {
						logIn();
					}
				}}
			>
				Start Game
			</button>
		</main>
	);
}
