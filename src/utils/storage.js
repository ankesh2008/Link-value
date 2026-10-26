import initialResources from '../data/initialResources.json';
import curriculumResources from '../data/curriculumResources.json';

const STORAGE_KEY = 'linkvalue_resources_v4';
const LEGACY_STORAGE_KEY = 'linkvalue_resources_v3';
const API_KEY_STORAGE = 'linkvalue_mistral_api_key';
const DEFAULT_RESOURCES = [...initialResources, ...curriculumResources];

export function getStoredResources() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
      const storedResources = legacyRaw ? JSON.parse(legacyRaw) : initialResources;
      const migratedResources = Array.isArray(storedResources) && storedResources.length > 0
        ? [
            ...storedResources,
            ...curriculumResources.filter(
              (resource) => !storedResources.some((stored) => stored.id === resource.id)
            )
          ]
        : DEFAULT_RESOURCES;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migratedResources));
      return migratedResources.length > 0 ? migratedResources : DEFAULT_RESOURCES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_RESOURCES;
  } catch (err) {
    console.error('Failed to read from localStorage:', err);
    return DEFAULT_RESOURCES;
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_RESOURCES));
    return DEFAULT_RESOURCES;
  } catch (err) {
    console.error('Failed to reset localStorage:', err);
    return DEFAULT_RESOURCES;
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
