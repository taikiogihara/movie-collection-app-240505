// Import necessary dependencies from React and other libraries
import React, { useState, useEffect } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import config from "./amplifyconfiguration.json";
import Modal from "react-modal";
import axios from "axios";
import { generateClient } from "aws-amplify/api";
import { createMovie, updateMovie, deleteMovie } from "./graphql/mutations";
import { listMovies } from "./graphql/queries";
import { FaTrash } from "react-icons/fa";

// Import CSS files for styling
import "./App.css";

// Configure Amplify with the provided configuration
Amplify.configure(config);

// Define constants
const API_KEY = "5893689a1b35b0083127c388b31bcd75";
const client = generateClient();

// Set up modal styles
Modal.setAppElement("#root");

// Define the main App component
const App = ({ signOut, user }) => {
    // Use state to manage the active tab
    const [activeTab, setActiveTab] = useState("search");

    // Function to handle tab clicks and update the active tab
    const handleTabClick = (tab) => {
        setActiveTab(tab);
        console.log(`Tab clicked: ${tab}`);
    };

    // Render the App component
    return (
        <div className="app">
            {/* Render the header */}
            <div className="header">
                <p>Hello {user.username}</p>
                {/* Render the tab buttons */}
                <div className="tabs">
                    <button
                        className={`tab ${
                            activeTab === "search" ? "active" : ""
                        }`}
                        onClick={() => handleTabClick("search")}
                    >
                        <i className="fas fa-search"></i> Movie Search
                    </button>
                    <button
                        className={`tab ${
                            activeTab === "viewer" ? "active" : ""
                        }`}
                        onClick={() => handleTabClick("viewer")}
                    >
                        <i className="fas fa-collection"></i> Movie Collection
                    </button>
                    <button
                        className={`tab ${
                            activeTab === "profile" ? "active" : ""
                        }`}
                        onClick={() => handleTabClick("profile")}
                    >
                        <i className="fas fa-user"></i> User Profile
                    </button>
                </div>
                {/* Render the sign out button */}
                <button className="signout-button" onClick={signOut}>
                    Sign out
                </button>
            </div>

            {/* Use SwitchTransition and CSSTransition for animating between tabs */}
            <SwitchTransition mode="out-in">
                <CSSTransition
                    key={activeTab}
                    addEndListener={(node, done) => {
                        node.addEventListener("transitionend", done, false);
                    }}
                    classNames="fade"
                >
                    <div className="tab-content">
                        {activeTab === "search" ? (
                            <MovieSearch />
                        ) : activeTab === "viewer" ? (
                            <MovieDataViewer />
                        ) : (
                            <UserProfile user={user} />
                        )}
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </div>
    );
};

const MovieSearch = () => {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [years, setYears] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedRating, setSelectedRating] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Helper functions to extract unique genres, years, and ratings
    const extractUniqueValues = (data) => {
        const allGenres = [];
        const allYears = new Set();
        const allRatings = new Set();

        data.forEach((movie) => {
            if (movie.release_date) {
                allYears.add(movie.release_date.substring(0, 4));
            }
            if (movie.vote_average) {
                allRatings.add(Math.floor(movie.vote_average));
            }
            movie.genre_ids.forEach((genre) => {
                const found = genres.find((g) => g.id === genre);
                if (found && !allGenres.some((g) => g.id === found.id)) {
                    allGenres.push({ id: found.id, name: found.name });
                }
            });
        });

        setGenres(allGenres);
        setYears([...allYears].sort((a, b) => b - a));
        setRatings([...allRatings].sort((a, b) => b - a));
    };

    // Function to search movies based on the query and page number
    const searchMovies = async (query, page = 1) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
            );
            const movieResults = response.data.results;
            setMovies(movieResults);
            setTotalPages(response.data.total_pages);
            extractUniqueValues(movieResults); // Call to extract and update genres, years, and ratings
            console.log("Searched movies:", movieResults);
        } catch (error) {
            console.error("Error fetching movies:", error);
            setError("Failed to fetch movies. Please try again.");
        }
        setIsLoading(false);
    };

    // Function to handle the search action when the search button is clicked
    const handleSearch = () => {
        setMovies([]);
        setCurrentPage(1);
        searchMovies(query);
        console.log(`Searching movies with query: ${query}`);
    };

    return (
        <div className="movie-search">
            <h1>Movie Search</h1>
            <div className="search-container">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                    className="search-bar"
                />
                <button onClick={handleSearch} className="search-button">
                    Search
                </button>
            </div>
            <div className="filters">
                <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                >
                    <option value="">All Genres</option>
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                >
                    <option value="">All Years</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.target.value)}
                >
                    <option value="">All Ratings</option>
                    {ratings.map((rating) => (
                        <option key={rating} value={rating}>
                            {rating}
                        </option>
                    ))}
                </select>
            </div>
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : (
                <div className="movie-list">
                    {movies.map((movie) => (
                        <div key={movie.id}>{movie.title}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Define the MovieDataViewer component
const MovieDataViewer = () => {
    // Use state to manage saved movies, selected movie, deletion state, and search query
    const [savedMovies, setSavedMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    // Use useEffect to fetch saved movies when the component mounts
    useEffect(() => {
        const fetchSavedMovies = async () => {
            try {
                const movieData = await client.graphql({ query: listMovies });
                const movies = movieData.data.listMovies.items;
                setSavedMovies(movies);
                console.log("Fetched saved movies:", movies);
            } catch (error) {
                console.error("Error fetching saved movies:", error);
            }
        };

        fetchSavedMovies();
    }, []);

    // Function to handle clicking on a movie
    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
        console.log(`Clicked on movie with ID ${movie.id}`);
    };

    // Function to handle deleting a movie
    const handleDeleteMovie = async (movieId) => {
        setIsDeleting(true);
        try {
            await client.graphql({
                query: deleteMovie,
                variables: { input: { id: movieId } },
            });
            const updatedMovies = savedMovies.filter(
                (movie) => movie.id !== movieId
            );
            setSavedMovies(updatedMovies);
            setSelectedMovie(null);
            console.log(`Deleted movie with ID ${movieId}`);
        } catch (error) {
            console.error("Error deleting movie:", error);
        }
        setIsDeleting(false);
    };

    // Function to handle changing the search query
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        console.log(`Changed search query to ${event.target.value}`);
    };

    // Filter the saved movies based on the search query
    const filteredSavedMovies = savedMovies.filter((movie) => {
        const movieTitle = movie.title.toLowerCase();
        const query = searchQuery.toLowerCase();
        return movieTitle.includes(query);
    });
    console.log("Filtered saved movies:", filteredSavedMovies);

    // Render the MovieDataViewer component
    return (
        <div className="movie-data-viewer">
            <h2>Saved Movies</h2>
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search saved movies"
            />
            <MovieList
                movies={filteredSavedMovies}
                onMovieClick={handleMovieClick}
            />
            {selectedMovie && (
                <MovieDetails
                    movie={selectedMovie}
                    onDeleteMovie={handleDeleteMovie}
                    isDeleting={isDeleting}
                />
            )}
        </div>
    );
};
// Define the MovieSort component
const MovieSort = ({ sortCriteria, onSortCriteriaChange }) => {
    // Render the movie sort dropdown
    return (
        <select value={sortCriteria} onChange={onSortCriteriaChange}>
            <option value="title">Sort by Title</option>
            <option value="releaseDate">Sort by Release Date</option>
            <option value="popularity">Sort by Popularity</option>
        </select>
    );
};
// Define the MovieList component
const MovieList = ({
    movies,
    savedMovies,
    onOpenModal,
    onSaveMovie,
    onFetchCollectionMovies,
    onMovieClick,
}) => {
    // Render the movie list
    return (
        <div className="movie-list">
            {movies.map((movie) => {
                const isSaved = savedMovies?.some(
                    (savedMovie) => savedMovie.id === movie.id
                );
                return movie.belongs_to_collection ? null : (
                    <MovieItem
                        key={movie.id}
                        movie={movie}
                        isSaved={isSaved}
                        onOpenModal={onOpenModal}
                        onSaveMovie={onSaveMovie}
                        onMovieClick={onMovieClick}
                    />
                );
            })}
        </div>
    );
};
// Define the MovieItem component
const MovieItem = ({
    movie,
    isSaved,
    onOpenModal,
    onSaveMovie,
    onMovieClick,
}) => {
    // Function to handle clicking on a movie item
    const handleClick = () => {
        if (onOpenModal) {
            onOpenModal(movie);
        } else if (onMovieClick) {
            onMovieClick(movie);
        }
    };
    // Render the movie item
    return (
        <div className="movie-item" onClick={handleClick}>
            {movie.poster_path ? (
                <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                />
            ) : (
                <div className="no-image">No Image</div>
            )}
            <div className="movie-info">
                <h4>
                    {movie.original_title}
                    {movie.japanese_title && (
                        <>
                            <br />
                            {movie.japanese_title}
                        </>
                    )}
                </h4>
                {isSaved && <span className="saved-label">Saved</span>}
                {onSaveMovie && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onSaveMovie(movie);
                        }}
                    >
                        {isSaved ? "Unsave" : "Save"}
                    </button>
                )}
            </div>
        </div>
    );
};

// Define the MovieDetails component
const MovieDetails = ({
    movie,
    onSaveMovie,
    onCloseModal,
    onDeleteMovie,
    isDeleting,
}) => {
    // Render the movie details
    return (
        <div className="movie-details-modal-content">
            <button
                className="movie-details-modal-close"
                onClick={onCloseModal}
            >
                ×
            </button>
            <h2 className="movie-details-modal-title">
                {movie.title}
                {movie.japanese_title && `${movie.japanese_title}`}
            </h2>
            <div className="movie-details-modal-info">
                {movie.poster_path && (
                    <img
                        className="movie-details-modal-poster"
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                    />
                )}
                <div className="movie-details-modal-overview">
                    <p>{movie.overview}</p>
                    {movie.japanese_overview && (
                        <p>{movie.japanese_overview}</p>
                    )}
                    <p>Released on: {movie.release_date}</p>
                </div>
            </div>
            <div className="movie-details-modal-cast">
                <h4>Cast:</h4>
                {movie.cast.map((actor, index) => (
                    <p key={index}>
                        {actor.name} as {actor.character}
                    </p>
                ))}
            </div>
            <div className="movie-details-modal-crew">
                <h4>Crew:</h4>
                {movie.crew.map((member, index) => (
                    <p key={index}>
                        {member.name} ({member.job})
                    </p>
                ))}
            </div>
            <div className="movie-details-modal-actions">
                {onSaveMovie && (
                    <button
                        onClick={() => onSaveMovie(movie)}
                        className="movie-details-modal-save"
                    >
                        {movie.saved ? "Saved" : "Save"}
                    </button>
                )}
                {onDeleteMovie && (
                    <button
                        onClick={() => onDeleteMovie(movie.id)}
                        className="movie-details-modal-delete"
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : <FaTrash />}
                    </button>
                )}
            </div>
        </div>
    );
};
// Define the UserProfile component
const UserProfile = ({ user }) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const handleUpdateUser = () => {
        // Implement user update logic here
        console.log("Update user profile");
    };

    const handleChangePassword = () => {
        // Implement password change logic here
        console.log("Change password");
    };

    return (
        <div className="user-profile">
            <h2>User Profile</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <button onClick={handleUpdateUser}>Update Profile</button>
            <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current Password"
            />
            <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
            />
            <button onClick={handleChangePassword}>Change Password</button>
        </div>
    );
};
const fetchMovieDetails = async (movieId) => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
        );
        console.log(
            `Fetched movie details for movie ID ${movieId}:`,
            response.data
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return null;
    }
};
const fetchMovieCredits = async (movieId, language = null) => {
    try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}${
            language ? `&language=${language}` : ""
        }`;
        const response = await axios.get(url);
        console.log(
            "Fetched movie credits for movie ID ${movieId}:",
            response.data
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching movie credits:", error);
        return null;
    }
};
const fetchMovieTranslations = async (movieId) => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/translations?api_key=${API_KEY}`
        );
        console.log(
            `Fetched movie translations for movie ID ${movieId}:`,
            response.data.translations
        );
        return response.data.translations;
    } catch (error) {
        console.error("Error fetching movie translations:", error);
        return null;
    }
};
const fetchCollectionDetails = async (collectionId) => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/collection/${collectionId}?api_key=${API_KEY}`
        );
        console.log(
            `Fetched collection details for collection ID ${collectionId}:`,
            response.data
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching collection details:", error);
        return null;
    }
};
// Export the App component wrapped with the withAuthenticator higher-order component
export default withAuthenticator(App);
