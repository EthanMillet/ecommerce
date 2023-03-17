const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: Product
    })
    res.status(200).json(categoryData);
  }catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: Product
    })

    if (!categoryData) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  }catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  // {
  // category_name: "Sports"
  // }
  try {
    await Category.create({
      category_name: req.body.category_name
    })
    res.status(200).json("Created Categories");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  // {
  // category_name: "Sports2"
  // }
  
  try {
    await Category.update({category_name: req.params.category_name}, {where: {id: req.params.id}})
    res.status(200).json("Updated Categories");
  }catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id
      },
    })
    if (!deleteCategory) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
  res.status(200).json(deleteCategory);
  } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
