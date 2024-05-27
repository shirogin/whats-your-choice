// API configuration
export const API_ROUTE = import.meta.env.WYC_API_ROUTE || '/api/v1';

// languages configuration
export const CHANGE_DIRECTION = import.meta.env.WYC_CHANGE_DIRECTION || false;
// if not get browser default language
/* export const DEFAULT_LANGUAGE = (import.meta.env.WYC_DEFAULT_LANGUAGE ||
	window.navigator.language?.split('-')[0].toUpperCase() ||
	'FR') as LanguagesI; */

// DEBUG
//export const CLIENT_DEBUG = "[Client]";

// DEV
export const DEV = import.meta.env.WYC_DEV || false;
export const DISABLE_AUTH = import.meta.env.WYC_DISABLE_AUTH || false;
// soket url
export const SOCKET_URL = import.meta.env.WYC_SOCKET_URL || 'http://localhost:3000';
