
/**
 * API Key Management Service
 * 
 * Retrieves API key from environment variables only.
 * For production, the backend (Phase 4) will handle API keys.
 * 
 * Development: Set GEMINI_API_KEY in .env.local file
 * Production: Backend will provide the API key
 */

/**
 * Get the API key from environment variable
 * @returns API key string or null if not found
 */
export const getApiKey = (): string | null => {
  // Check environment variables (set via vite.config.ts)
  // Check both Vite's import.meta.env and process.env (for compatibility)
  const envKey = import.meta.env.VITE_GEMINI_API_KEY || 
                 import.meta.env.GEMINI_API_KEY ||
                 (process.env as any).API_KEY ||
                 (process.env as any).GEMINI_API_KEY;
  
  if (envKey && typeof envKey === 'string' && envKey.trim().length > 0) {
    return envKey.trim();
  }
  
  return null;
};

/**
 * Check if an API key is available
 * @returns true if API key exists, false otherwise
 */
export const hasApiKey = (): boolean => {
  return getApiKey() !== null;
};
