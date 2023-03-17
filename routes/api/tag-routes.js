const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: { all: true, nested: true }    })
    res.status(200).json(tagData);
  }catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: { all: true, nested: true }    })

    if (!tagData) {
      res.status(404).json({ message: 'No Tag found with this id!' });
      return;
    }
    res.status(200).json(tagData);
  }catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    await Tag.create({
      category_name: req.body.tag_name
    })
    res.status(200).json("Tag Categories");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    await Category.update({tag_name: req.params.tag_name}, {where: {id: req.params.id}})
    res.status(200).json("Updated Categories");
  }catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const deleteTag = await Category.destroy({
      where: {
        id: req.params.id
      },
    })
    if (!deleteTag) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
  res.status(200).json(deleteTag);
  } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
