const Movie = require('../models/movie');

const validateMovieData = (data) => {
    const { title, release_date } = data;
    if (!title || typeof title !== 'string' || title.trim() === '') {
        return "Title is required and must be a non-empty string";
    }
    if (!release_date || isNaN(new Date(release_date).getTime())) {
        return "Release date is required and must be a valid date";
    }
    return null;
};

const asyncHandler = (fn) => async (req, res) => {
    try {
        await fn(req, res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getAllMovies = asyncHandler(async (req, res) => {
    const movies = await Movie.findAll();
    res.status(200).json(movies);
});

const getMovieById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);
    if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
    }
    res.status(200).json(movie);
});

const createMovie = asyncHandler(async (req, res) => {
    const { title, release_date, metadata } = req.body;
    const validationError = validateMovieData({ title, release_date });
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }
    const movie = await Movie.create({ title, release_date, metadata });
    res.status(201).json(movie);
});

const updateMovie = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, release_date, metadata } = req.body;
    const validationError = validateMovieData({ title, release_date });
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }
    const [updated] = await Movie.update({ title, release_date, metadata }, { where: { id } });
    if (updated === 0) {
        return res.status(404).json({ error: 'Movie not found' });
    }
    const updatedMovie = await Movie.findByPk(id);
    res.status(200).json(updatedMovie);
});

const deleteMovie = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deleted = await Movie.destroy({ where: { id } });
    if (deleted === 0) {
        return res.status(404).json({ error: 'Movie not found' });
    }
    res.status(204).send();
});

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
};