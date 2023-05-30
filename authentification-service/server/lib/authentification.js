const MAX_LOGIN_ATTEMPTS = 5; // Maximum number of allowed login attempts
const LOCKOUT_DURATION = 30 * 60 * 1000; // Lockout duration in milliseconds (30 minutes)
const bcrypt = require('bcrypt');
const prisma = require('../../prisma/dbConnection');
const jwt = require('jsonwebtoken');
class AuthentificationService {
	constructor() {
		this.jwtSecret = 'server-secret';
	}

	async login(username, password) {
		let user;
		// Find user by username
		user = await prisma.users.findFirst({
			where: {
				username: username,
			},
		});
		let role = await prisma.roles.findFirst({
			where: {
				role_id: user?.role_id,
			},
		});

		// Throw error if user not found
		if (!user) {
			throw new Error('Invalid credentials: username');
		}
		let attempts = user.attempts;
		// Check if the account is locked
		if (attempts >= MAX_LOGIN_ATTEMPTS) {
			const lockoutStartDate = new Date(user.lockoutStartDate);
			const lockoutEndDate = new Date(
				lockoutStartDate.getTime() + LOCKOUT_DURATION
			);

			if (lockoutEndDate > new Date()) {
				//	if (x + LOCKOUT_DURATION > new Date()) {
				return {
					message: 'Account is locked. Please try again later.',
				};
			}
			// Reset attempts and last fail date if lockout duration has passed
			else {
				attempts = 0;
				const y = await prisma.users.update({
					where: { id: user.id },
					data: {
						attempts: 0,
						lockoutStartDate: null,
					},
				});
			}
		}

		// Check password
		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			// Increment login attempts and update last fail date
			await prisma.users.update({
				where: { id: user.id },
				data: {
					attempts: attempts + 1,
					lockoutStartDate: new Date(),
				},
			});

			if (attempts >= MAX_LOGIN_ATTEMPTS) {
				const q = 'alertMessage';
				const conn = await amqplib.connect('amqp://localhost');
				const channel = await conn.createannelannel();
				await channel.assertQueue(q);
				const qm = JSON.stringify({
					user: user.id,
					date: new Date(),
					message: 'trying to login many times',
				});
				return channel.sendToQueue(q, Buffer.from(qm, 'utf8'));
			}

			return {
				message: 'Invalid credentials: password',
				type: 'error',
			};
		}

		// Reset login attempts and last fail date on successful login
		await prisma.users.update({
			where: { id: user.id },
			data: {
				attempts: 0,
				lockoutStartDate: null,
			},
		});

		// Create JWT
		const token = jwt.sign(
			{
				id: user.id,
				role: role.role_name,
				idRole: role.role_id,
			},
			this.jwtSecret
		);

		const response = {
			token,
			name: user.name,
			email: user.email,
		};

		return response;
	}
}

module.exports = AuthentificationService;
