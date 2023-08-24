const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Get all Categories and associated Products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: Product, // Includes associated Products
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get one category by 'id' and its associated products
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: Product, // Includes associated Products
    });
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deletedCategory) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Export
module.exports = router;
