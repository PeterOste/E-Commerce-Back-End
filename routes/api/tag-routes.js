const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
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
