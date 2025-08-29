/**
 * Base URL of the frontend website.
 * Used throughout the app to construct absolute URLs.
 */
export const WEBSITE_BASE_URL = "https://freshgroup.vercel.app/";

/**
 * Redirect URI for the "Forgot Password" flow.
 * In production, this should point to the live website's reset page:
 *    https://freshgroup.vercel.app/forgot-password/new-password
 * Currently set to localhost for development purposes:
 */
export const FORGOT_PASSWORD_REDIRECT_URI = "https://freshgroup.vercel.app/forgot-password/new-password";

/**
 * Base URL for the backend API.
 * Use the appropriate URL depending on the environment:
 * - Local development: http://127.0.0.1:8000
 * - Backup / staging: https://freshgroup-api.onrender.com/
 * - Production (current): Azure deployment
 */
export const FAST_API_BASE_URL = "https://cluster-gpbcemc3hfcyaueq.canadacentral-01.azurewebsites.net";
