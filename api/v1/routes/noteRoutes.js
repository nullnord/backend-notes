const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const authMiddleware = require('../../../lib/middleware/authMiddleware');


router.post('/', authMiddleware, noteController.create);
router.get('/', authMiddleware, noteController.getAll);
router.get('/:id', authMiddleware, noteController.getById);
router.put('/:id', authMiddleware, noteController.update);
router.delete('/:id', authMiddleware, noteController.delete);
router.post('/:id/share', authMiddleware, noteController.share);
router.get('/search', authMiddleware, noteController.search);


module.exports = router;
