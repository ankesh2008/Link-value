import initialResources from '../data/initialResources.json';

const STORAGE_KEY = 'linkvalue_resources_v3';
const API_KEY_STORAGE = 'linkvalue_mistral_api_key';

export function getStoredResources() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialResources));
      return initialResources;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialResources;
  } catch (err) {
    console.error('Failed to read from localStorage:', err);
    return initialResources;
  }
}

export function saveResources(resources) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resources));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

export function resetResourcesToDefault() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialResources));
    return initialResources;
  } catch (err) {
    console.error('Failed to reset localStorage:', err);
    return initialResources;
  }
}

export function getStoredApiKey() {
  return localStorage.getItem(API_KEY_STORAGE) || '';
}

export function saveStoredApiKey(key) {
  if (!key) {
    localStorage.removeItem(API_KEY_STORAGE);
  } else {
    localStorage.setItem(API_KEY_STORAGE, key.trim());
  }
}
