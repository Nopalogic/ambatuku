import api, { handleApiError } from './api';

interface RegisterProps {
	name: string;
	email: string;
	password: string;
}

export const registerUser = async (userData: RegisterProps) => {
	try {
		const response = await api.post('/auth/register', userData);
		return response.data;
	} catch (error) {
		throw handleApiError(error);
	}
};

interface LoginProps {
	email: string;
	password: string;
}

export const loginUser = async (userData: LoginProps) => {
	try {
		const response = await api.post('/auth/login', userData);
		return response.data;
	} catch (error) {
		throw handleApiError(error);
	}
};

export const verifyToken = async (token: string) => {
	try {
		const response = await api.get('/auth/verify-token', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		throw handleApiError(error);
	}
};
