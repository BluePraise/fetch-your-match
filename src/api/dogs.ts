// src/api/dogs.ts
import axios from 'axios';

const BASE_URL = 'https://frontend-take-home-service.fetch.com';

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
    withCredentials: true,
  });
  return response.data; // { resultIds, total, next, prev }
}

export async function fetchDogsByIds(ids: string[]) {
  const response = await axios.post(`${BASE_URL}/dogs`, ids, {
    withCredentials: true,
  });
  return response.data; // returns an array of Dog objects
}

export async function fetchDogBreeds() {
  const response = await axios.get(`${BASE_URL}/dogs/breeds`, {
    withCredentials: true,
  });
  return response.data; // returns an array of breed names
}

export async function fetchDogMatch(ids: string[]) {
  const response = await axios.post(`${BASE_URL}/dogs/match`, ids, {
    withCredentials: true,
  });
  return response.data; // returns { match: string }
}