import React, { useEffect, useState } from "react";
import {
	fetchDogsSearch,
	fetchDogsByIds,
	fetchDogBreeds,
} from "../api/dogs.ts";

// Dog interface as provided by the API
interface Dog {
	id: string;
	img: string;
	name: string;
	age: number;
	zip_code: string;
	breed: string;
}

const SearchPage: React.FC = () => {
	const [dogs, setDogs] = useState<Dog[]>([]);
	const [breeds, setBreeds] = useState<string[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	// Filter states
	const [selectedBreed, setSelectedBreed] = useState<string>("");
	const [ageMin, setAgeMin] = useState<number | "">("");
	const [ageMax, setAgeMax] = useState<number | "">("");

	// Fetch available breeds on mount
	useEffect(() => {
		const loadBreeds = async () => {
			try {
				const breedData = await fetchDogBreeds();
				setBreeds(breedData);
			} catch (err) {
				console.error("Error fetching breeds:", err);
			}
		};
		loadBreeds();
	}, []);

	// Function to fetch dogs based on filters
	const loadDogs = async () => {
		setLoading(true);
		setError(null);
		try {
			// parameters object for the search
			const params: {
				size: number;
				breeds?: string[];
				ageMin?: number;
				ageMax?: number;
			} = { size: 25 };

			if (selectedBreed) {
				params.breeds = [selectedBreed];
			}
			if (ageMin !== "") {
				params.ageMin = ageMin as number;
			}
			if (ageMax !== "") {
				params.ageMax = ageMax as number;
			}

			// Fetch search results (list of dog IDs)
			const searchResults = await fetchDogsSearch(params);
			const dogIds: string[] = searchResults.resultIds;

			// Fetch the full dog objects using the IDs
			const dogsData = await fetchDogsByIds(dogIds);
			setDogs(dogsData);
		} catch (err) {
			console.error(err);
			setError("Failed to load dogs. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	// Load dogs initially on mount (without filters)
	useEffect(() => {
		loadDogs();
	}, []);

	// Handle filter form submission
	const handleFilterSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		loadDogs();
	};

	// Render states: loading, error, or the list of dogs
	if (loading) return <div>Loading dogs...</div>;
	if (error) return <div>{error}</div>;

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Search Dogs</h1>

			{/* Filter Form */}
			<form
				onSubmit={handleFilterSubmit}
				className="mb-6 grid grid-cols-4 gap-4">
				<div>
					<label className="block mb-1 font-semibold" htmlFor="breed">
						Filter By Breed
					</label>
					<select
						id="breed"
						className="w-full border border-gray-300 rounded p-2"
						value={selectedBreed}
						onChange={(e) => setSelectedBreed(e.target.value)}>
						<option value="">All Breeds</option>
						{breeds.map((breed) => (
							<option key={breed} value={breed}>
								{breed}
							</option>
						))}
					</select>
				</div>
				<div>
					<label
						className="block mb-1 font-semibold"
						htmlFor="ageMin">
						Min Age
					</label>
					<input
						type="number"
						id="ageMin"
						className="w-full border border-gray-300 rounded p-2"
						value={ageMin}
						onChange={(e) =>
							setAgeMin(
								e.target.value ? Number(e.target.value) : ""
							)
						}
						placeholder="e.g. 1"
					/>
				</div>
				<div>
					<label
						className="block mb-1 font-semibold"
						htmlFor="ageMax">
						Max Age
					</label>
					<input
						type="number"
						id="ageMax"
						className="w-full border border-gray-300 rounded p-2"
						value={ageMax}
						onChange={(e) =>
							setAgeMax(
								e.target.value ? Number(e.target.value) : ""
							)
						}
						placeholder="e.g. 10"
					/>
				</div>
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer">
            Apply Filters
          </button>
        </div>
			</form>

			{loading && <div>Loading dogs...</div>}
			{error && <div className="text-red-600">{error}</div>}

			{/* Display Dog Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{dogs.map((dog) => (
					<div key={dog.id} className="border border-gray-50 hover:border-purple-500 p-4 rounded shadow cursor-pointer">
						<img
							src={dog.img}
							alt={dog.name}
							className="w-full h-40 object-cover mb-2 rounded"
						/>
						<h2 className="text-xl font-semibold">{dog.name}</h2>
						<p>{dog.breed}</p>
						<p>{dog.age} years old</p>
						<p>ZIP: {dog.zip_code}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default SearchPage;