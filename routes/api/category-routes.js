const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll()
  // be sure to include its associated Products
  .then(dbStoreData => res.json(dbStoreData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  // be sure to include its associated Products
  .then(dbStoreData => {
    if (!dbStoreData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(dbStoreData);
  })  
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  // create a new category
  .then(dbStoreData => res.json(dbStoreData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  // update a category by its `id` 
  .then(dbStoreData => {
    if (!dbStoreData[0]) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(dbStoreData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbStoreData => {
    if (!dbStoreData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(dbStoreData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
