// src/api/dogs.ts
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
  const url = new URL(`${BASE_URL}/dogs/search`);

  // Add search parameters using URLSearchParams
  const searchParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        if (Array.isArray(value)) {
          value.forEach((val) => searchParams.append(key, val));
        } else {
          searchParams.append(key, String(value));
        }
      }
    });
  }

  url.search = searchParams.toString(); // Attach query params to URL

  const response = await fetch(url.toString(), {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch dogs: ${response.statusText}`);
  }

  return response.json(); // { resultIds, total, next, prev }
}

export async function fetchDogsByIds(ids: string[]) {
  const response = await fetch(`${BASE_URL}/dogs`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ids),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch dog details: ${response.statusText}`);
  }

  return response.json(); // Returns an array of Dog objects
}
export async function fetchDogBreeds() {
  const response = await fetch(`${BASE_URL}/dogs/breeds`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch breeds: ${response.statusText}`);
  }

  return response.json(); // Returns an array of breed names
}

export async function fetchDogMatch(ids: string[]) {
  const response = await fetch(`${BASE_URL}/dogs/match`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ids),
  });

  if (!response.ok) {
    throw new Error(`Failed to generate match: ${response.statusText}`);
  }

  return response.json(); // Returns { match: "dog_id" }
}