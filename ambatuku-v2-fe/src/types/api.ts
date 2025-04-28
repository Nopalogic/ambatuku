// Generic response type for paginated data
export interface ApiResponse<T> {
	data: T;
	message?: string;
	status?: number;
}

// Error response type
export interface ApiError {
	message: string;
	status?: number;
	errors?: Record<string, string[]>;
}
