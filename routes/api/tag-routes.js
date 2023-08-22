const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../models');

// The `/api/tags` endpoint

// Get all tags
router.get('/', async (req, res) => {
  try {
    const tagsWithProducts = await Tag.findAll({
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'],
        through: {
          attributes: [] // Exclude join table attributes from response
        }
      }
    });
    
    res.status(200).json(tagsWithProducts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get tag by id
router.get('/:id', async (req, res) => {
  try {
    const tagWithProducts = await Tag.findByPk(req.params.id, {
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'],
        through: {
          attributes: [] // Exclude join table attributes from response
        }
      }
    });
    
    if (!tagWithProducts) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    res.status(200).json(tagWithProducts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update tag by id
router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(
      { tag_name: req.body.tag_name }, // New tag_name from req.body
      {
        where: {
          id: req.params.id
        }
      }
    );

    if (updatedTag[0] === 0) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Tag name updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete tag by id
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
