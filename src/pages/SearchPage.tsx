import React, { useEffect, useState } from "react";
import {
	fetchDogsSearch,
	fetchDogsByIds,
	fetchDogBreeds,
	fetchDogMatch,
	fetchZipCodesByDistance,
} from "../api/dogs.ts";

import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper,
  Slide,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";

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

	// Pagination states
  	const [nextCursor, setNextCursor] = useState<string | null>(null);
  	const [prevCursor, setPrevCursor] = useState<string | null>(null);

	// Filter states
	const [selectedBreed, setSelectedBreed] = useState<string>("");
	const [ageMin, setAgeMin] = useState<number | "">("");
	const [ageMax, setAgeMax] = useState<number | "">("");
	const [zipCode, setZipCode] = useState<string>("");
  	const [distance, setDistance] = useState<number>(10); // Default to 10 miles
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Default to ascending

	// Favorites and match state
	const [drawerOpen, setDrawerOpen] = useState(false); // Controls expanded drawer
	const [favorites, setFavorites] = useState<Dog[]>([]); // Stores favorited dogs
	const [matchDog, setMatchDog] = useState<Dog | null>(null); // Stores matched dog


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

	// Fetch dogs based on filters
	const loadDogs = async (cursor?: string) => {
		setLoading(true);
		setError(null);
		try {
			// parameters object for the search
			const params: {
				size: number;
				breeds?: string[];
				ageMin?: number;
				ageMax?: number;
				zip_code?: string[];
				from?: string;
				sort?: string;
			} = { size: 28, sort: `breed:${sortOrder}`};

			// if (cursor) params.from = cursor;
			if (cursor) {
				params.from = cursor;
			}

			if (selectedBreed) {
				params.breeds = [selectedBreed];
			}
			if (ageMin !== "") {
				params.ageMin = ageMin as number;
			}
			if (ageMax !== "") {
				params.ageMax = ageMax as number;
			}

			if (zipCode) {
				try {
					const zipCodes = await fetchZipCodesByDistance(zipCode, distance);
					params.zip_code = zipCodes;
				} catch (err) {
					console.error("Error fetching ZIP codes:", err);
					setError("Invalid ZIP code or no results in range.");
					return;
				}
			}

			// Fetch search results (list of dog IDs)
			const searchResults = await fetchDogsSearch(params);
			const dogIds: string[] = searchResults.resultIds;

			// Extract only the query parameters from `next` and `prev` cursor
			setNextCursor(searchResults.next ? searchResults.next.split("from=")[1] : null);
      		setPrevCursor(searchResults.prev ? searchResults.prev.split("from=")[1] : null);

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
	// Load dogs initially on mount
	useEffect(() => {
		loadDogs();
	}, [sortOrder]);

	// Toggle favorite dog
	const toggleFavorite = (dog: Dog) => {
		setFavorites((prev) => {
		const newFavorites = prev.some((fav) => fav.id === dog.id)
			? prev.filter((fav) => fav.id !== dog.id)
			: [...prev, dog];
		return newFavorites;
		});
	};

  // Generate a match from favorites
  const handleGenerateMatch = async () => {
    if (favorites.length === 0) return;
    try {
      const favoriteIds = favorites.map((dog) => dog.id);
      const result = await fetchDogMatch(favoriteIds);
      const matchedId = result.match;

      let matchedDog = favorites.find((dog) => dog.id === matchedId);
      if (!matchedDog) {
        const fetchedDogs = await fetchDogsByIds([matchedId]);
        matchedDog = fetchedDogs[0];
      }

      if (matchedDog) {
        setMatchDog(matchedDog);
      }
      setDrawerOpen(true); // Expand drawer when match is generated
    } catch (error) {
      console.error("Error generating match:", error);
    }
  };


	// Handle filter form submission
	const handleFilterSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		loadDogs();
	};

    // Pagination handlers
	const handleNext = () => {
		if (nextCursor) {
			loadDogs(nextCursor);
		}
	};

  	const handlePrev = () => {
		if (prevCursor) {
			loadDogs(prevCursor);
		}
	};

	// Handle sorting change
	const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSortOrder(e.target.value as "asc" | "desc");
	};

	// Render states: loading, error, or the list of dogs
	if (loading) return <div>Loading dogs...</div>;
	if (error) return <div>{error}</div>;

return (
    <div className="p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4">Search Dogs</h1>

      {/* Filter Form */}
      <form
	  	onSubmit={handleFilterSubmit}
	  	className="mb-6 grid grid-cols-4 gap-4">
        <div>
          <label htmlFor="breed" className="block mb-1 font-semibold">Breed</label>
          <select
            id="breed"
            className="w-full border border-gray-300 rounded p-2"
            value={selectedBreed}
            onChange={(e) => setSelectedBreed(e.target.value)}
          >
            <option value="">All Breeds</option>
            {breeds.map((breed) => (
              <option key={breed} value={breed}>{breed}</option>
            ))}
          </select>
        </div>

		{/* Sort Order Selection */}
        <div>
          <label htmlFor="sortOrder" className="block mb-1 font-semibold">Sort by Breed</label>
          <select
            id="sortOrder"
            className="w-full border border-gray-300 rounded p-2"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="asc">A → Z</option>
            <option value="desc">Z → A</option>
          </select>
        </div>
		{/* ZIP Code Filter */}
        <div>
          <label htmlFor="zipCode" className="block mb-1 font-semibold">ZIP Code</label>
          <input type="text" id="zipCode" className="w-full border border-gray-300 rounded p-2"
            placeholder="Enter ZIP Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
        </div>

        {/* Distance Filter */}
        <div>
          <label htmlFor="distance" className="block mb-1 font-semibold">Distance</label>
          <select id="distance" className="w-full border border-gray-300 rounded p-2"
            value={distance} onChange={(e) => setDistance(Number(e.target.value))}>
            <option value="10">10 miles</option>
            <option value="20">20 miles</option>
            <option value="50">50 miles</option>
            <option value="100">100 miles</option>
          </select>
        </div>

          <div>
            <label htmlFor="ageMin" className="block mb-1 font-semibold">Min Age</label>
            <input
              type="number"
              id="ageMin"
              className="w-full border border-gray-300 rounded p-2"
              value={ageMin}
              onChange={(e) => setAgeMin(e.target.value ? Number(e.target.value) : '')}
              placeholder="e.g. 1"
            />
          </div>
          <div>
            <label htmlFor="ageMax" className="block mb-1 font-semibold">Max Age</label>
            <input
              type="number"
              id="ageMax"
              className="w-full border border-gray-300 rounded p-2"
              value={ageMax}
              onChange={(e) => setAgeMax(e.target.value ? Number(e.target.value) : '')}
              placeholder="e.g. 10"
            />
          </div>
		<div>
			<button
			type="submit"
			className="btn btn__primary btn--deep-purple transition">
			Apply Filters
			</button>
		</div>
      </form>

      {loading && <div>Loading dogs...</div>}
      {error && <div className="text-red-600">{error}</div>}

      {/* Display Dog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {dogs.map((dog) => (

			<div key={dog.id} className="border border-gray-50 hover:border-purple-500 p-4 rounded shadow cursor-pointer">
				<img
					src={dog.img}
					alt={dog.name}
					className="w-full h-100 object-cover mb-2 rounded"
				/>
				<h2 className="text-xl font-semibold">{dog.name}</h2>
				<p>{dog.breed}</p>
				<p>{dog.age} years old</p>
				<p>ZIP: {dog.zip_code}</p>
				<IconButton
					onClick={() => toggleFavorite(dog)}
              		color={favorites.some((fav) => fav.id === dog.id) ? "error" : "default"}
            	>
              		<FavoriteIcon />
            	</IconButton>
			</div>

        ))}

		{/* Generate Match Button
			{favorites.length > 0 && (
				<button className="mt-6 px-4 py-2 bg-green-600 text-white rounded" onClick={handleGenerateMatch}>
				Generate Match
				</button>
			)}

			{/* Display Matched Dog */}
			{/* {matchDog && (
				<div className="mt-6 text-center">
				<h2 className="text-2xl font-bold mb-4">Your Match:</h2>
				<div className="border p-4 rounded shadow inline-block">
					<img src={matchDog.img} alt={matchDog.name} className="w-40 h-40 object-cover mb-2 rounded" />
					<h2 className="text-xl font-semibold">{matchDog.name}</h2>
					<p>{matchDog.breed}</p>
				</div>
				</div>
			)} */}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrev}
          disabled={!prevCursor}
          className={`px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition cursor-pointer ${!prevCursor ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!nextCursor}
          className={`px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition cursor-pointer ${!nextCursor ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </button>
      </div>
	    {/* Fixed Bottom Drawer */}
      <Paper
        elevation={5}
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          bgcolor: "white",
          boxShadow: "0px -2px 10px rgba(0,0,0,0.1)",
          transition: "height 0.3s ease-in-out",
          height: drawerOpen ? "60vh" : "80px", // Expands when drawerOpen is true
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      >
        {/* Drawer Header */}
        <div className="w-full max-w-lg flex justify-center items-center mb-2">
          <h2 className="text-lg font-bold">Favorites ({favorites.length})</h2>
          {drawerOpen && (
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          )}
        </div>

        {/* Generate Match Button with Badge Counter */}
        <Button
			variant="contained"
			onClick={handleGenerateMatch}
			disabled={favorites.length === 0}
			sx={{
				width: "200px",
				height: "80px",
				backgroundColor: "#300D38", // Custom purple
				fontSize: "16px",
				fontFamily: "inherit",
				fontWeight: "bold",
				borderRadius: "12px",
				textTransform: "none", // Prevents uppercase transformation
				"&:hover": { backgroundColor: "#6A1B9A" }, // Darker shade on hover
				"&:disabled": { backgroundColor: "#D3D3D3", color: "#888" } // Custom disabled state
			}}
			>
			Generate Match
			</Button>


        {/* Favorite Dogs List (Only visible when expanded) */}
        <Slide direction="up" in={drawerOpen} mountOnEnter unmountOnExit>
          <List sx={{ width: "100%", overflowY: "auto", maxHeight: "40vh" }}>
            {favorites.map((dog, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar src={dog.img} alt={dog.name} />
                </ListItemAvatar>
                <ListItemText primary={dog.name} secondary={dog.breed} />
                <IconButton onClick={() => toggleFavorite(dog)} color="error">
                  <CloseIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Slide>

        {/* Display Matched Dog */}
        {matchDog && drawerOpen && (
          <div className="mt-4 text-center">
            <h2 className="text-xl font-bold mb-2">Your Match:</h2>
            <div className="border p-4 rounded shadow inline-block">
              <img src={matchDog.img} alt={matchDog.name} className="w-40 h-40 object-cover mb-2 rounded" />
              <h2 className="text-xl font-semibold">{matchDog.name}</h2>
              <p>{matchDog.breed}</p>
            </div>
          </div>
        )}
      </Paper>
    </div>
	);
};

export default SearchPage;