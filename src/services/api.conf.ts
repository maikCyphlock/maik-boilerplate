import axios from "axios";

export const api = axios.create({
	baseURL: "http://localhost:3000/api",
	headers: {
		"Content-Type": "application/json",
	},
});
// intercept
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);
// Interceptors para manejar errores
api.interceptors.response.use(
	(response) => response,
	(error) => {
		// Handle network errors (no response from server)
		if (!error.response) {
			return Promise.reject({
				status: 503,
				message:
					"Error de conexión. Por favor verifica tu conexión a internet.",
				code: "NETWORK_ERROR",
				raw: error,
			});
		}

		const { status, data } = error.response;
		let message = "Error inesperado";

		// Handle different HTTP status codes
		switch (status) {
			case 400:
				message = data?.message || "Solicitud incorrecta";
				break;
			case 401:
				message = "No autorizado. Por favor inicia sesión nuevamente.";
				break;
			case 403:
				message = "No tienes permisos para realizar esta acción";
				break;
			case 404:
				message = "Recurso no encontrado";
				break;
			case 422:
				message = data?.message || "Error de validación";
				break;
			case 500:
				message = "Error interno del servidor";
				break;
			case 503:
				message = "Servicio no disponible. Por favor intenta más tarde.";
				break;
			default:
				message = data?.message || `Error (${status})`;
		}

		const customError = {
			status,
			message,
			code: data?.code || `HTTP_${status}`,
			validationErrors: data?.errors,
			timestamp: new Date().toISOString(),
			path: error.config?.url,
			method: error.config?.method,
			raw: process.env.NODE_ENV === "development" ? error : undefined,
		};

		// Log error in development
		if (process.env.NODE_ENV === "development") {
			console.error("API Error:", customError);
		}

		return Promise.reject(customError);
	},
);
