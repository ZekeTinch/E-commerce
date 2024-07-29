const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    const CategoryData = await Category.findAll();
    res.status(200).json(CategoryData);
  }catch (err) {
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  router.get('/:id', async (req, res) => {
    try {
      const CategoryData = await Category.findByPk(req.params.id, {
        include: [{ model: Category, through: Trip, as: 'location_Category' }]
      });
  
      if (!CategoryData) {
        res.status(404).json({ message: 'No Category found with this id!' });
        return;
      }
  
      res.status(200).json(CategoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  router.post('/', async (req, res) => {
    try {
      const CategoryData = await Category.create(req.body);
      res.status(200).json(CategoryData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  // create a new category
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where:{
      id: req.params.id,
    },
  })
  .then((Category) => {
    if (req.body.tagIds && req.body.tagIds.length) {
      
      CategoryTag.findAll({
        where: {Category_id: req.params.id }
      }).then((CategoryTags) => {
      const CategoryTagIds = CategoryTags.map(({ tag_id }) => tag_id);
      const newCategoryTags = req.body.tagIds
      .filter((tag_id) => !CategoryTagIds.includes(tag_id))
      .map((tag_id) => {
        return {
          product_id: req.params.id,
          tag_id,
        };
      })

      })
    }
  })
  // update a category by its `id` value
})


router.delete('/:id', (req, res) => {
  router.delete('/:id', async (req, res) => {
    try {
      const CategoryData = await Category.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!CategoryData) {
        res.status(404).json({ message: 'No Category found with this id!' });
        return;
      }
  
      res.status(200).json(CategoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // delete a category by its `id` value
});

module.exports = router;
