const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
});

// DELETE product tag by id
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await ProductTag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No product tag found with this id!'});
      return;
    }
    res.status(200).json({ message: 'Product tag successfully deleted'});
  } catch (err) {
    res.status(500).json(err);
  }
});

// Export
module.exports = router;
