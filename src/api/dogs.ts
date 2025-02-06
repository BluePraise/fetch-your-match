// src/api/dogs.ts
import axios from 'axios';

const BASE_URL = 'https://frontend-take-home-service.fetch.com';

/**
 * Calls the /dogs/search endpoint to get a list of dog IDs and pagination info.
 * You can optionally pass search parameters (e.g., breeds, size, sort).
 */
export async function fetchDogsSearch(params?: {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: string;
  sort?: string;
}) {
  const response = await axios.get(`${BASE_URL}/dogs/search`, {
    params,
    withCredentials: true, // Ensure cookies are included
  });
  return response.data; // returns an object with resultIds and pagination info
}

/**
 * Calls the /dogs endpoint with an array of dog IDs to get full dog objects.
 */
export async function fetchDogsByIds(ids: string[]) {
  const response = await axios.post(
    `${BASE_URL}/dogs`,
    ids,
    { withCredentials: true }
  );
  return response.data; // returns an array of dog objects
}

export async function fetchDogBreeds() {
  const response = await axios.get(`${BASE_URL}/dogs/breeds`, {
    withCredentials: true,
  });
  return response.data; // returns an array of breed names
}