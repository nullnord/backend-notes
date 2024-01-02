const Note = require('../models/note');

const noteController = {
    /**
     * Placeholder function for testing.
     */
    try: async (req, res) => {
        try {
            // Your code here
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },

    /**
     * Create a new note.
     */
    create: async (req, res) => {
        try {
            // Create a new note with the user as the author
            const note = new Note({
                ...req.body,
                author: req.user._id
            });
            // Save the note to the database
            await note.save();
            // Respond with the created note
            res.status(201).send(note);
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    },

    /**
     * Get all notes associated with the user.
     */
    async getAll(req, res) {
        try {
            // Use the find method to retrieve notes associated with the user.
            const notes = await Note.find({ author: req.user._id });
            // Respond with the retrieved notes
            res.send(notes);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },

    /**
     * Get a specific note by its ID.
     */
    getById: async (req, res) => {
        try {
            // Find the note by ID and ensure it's associated with the user
            const note = await Note.findOne({ _id: req.params.id, author: req.user._id });
            // If the note is not found, return a 404 response
            if (!note) {
                return res.status(404).send();
            }
            // Respond with the retrieved note
            res.send(note);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },

    /**
     * Update a specific note by its ID.
     */
    update: async (req, res) => {
        try {
            // Find and update the note by ID and ensure it's associated with the user
            const note = await Note.findOneAndUpdate(
                { _id: req.params.id, author: req.user._id },
                req.body,
                { new: true, runValidators: true }
            );
            // If the note is not found, return a 404 response
            if (!note) {
                return res.status(404).send();
            }
            // Respond with the updated note
            res.send(note);
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    },

    /**
     * Delete a specific note by its ID.
     */
    delete: async (req, res) => {
        try {
            // Find and delete the note by ID and ensure it's associated with the user
            const note = await Note.findOneAndDelete({ _id: req.params.id, author: req.user._id });
            // If the note is not found, return a 404 response
            if (!note) {
                return res.status(404).send();
            }
            // Respond with the deleted note
            res.send(note);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },

    /**
     * Share a specific note with another user.
     */
    share: async (req, res) => {
        try {
            // Find the note by ID and ensure it's associated with the user
            const note = await Note.findOne({ _id: req.params.id, author: req.user._id });
            // If the note is not found, return a 404 response
            if (!note) {
                return res.status(404).send();
            }
            // Add the user ID to the sharedWith array
            note.sharedWith.push(req.body.userId);
            // Save the updated note
            await note.save();
            // Respond with the updated note
            res.send(note);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },

    /**
     * Search for notes based on keywords.
     */
    search: async (req, res) => {
        try {
            // Get the search query from the request
            const query = req.query.q;
            // Use text indexing to search for notes matching the query and sort by relevance
            const notes = await Note.find(
                { $text: { $search: query } },
                { score: { $meta: 'textScore' } } // Sort by relevance!
            ).sort({ score: { $meta: 'textScore' } });
            // Respond with the matching notes
            res.send(notes);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }
};

module.exports = noteController;
