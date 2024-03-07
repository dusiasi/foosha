import ItemModel from '../models/items';

// posting new item to database
export const postItem = async (req, res) => {
  try {
    const { title, description, owner, date, available, locationName, image } =
      req.body;
    const { lat, lng } = req.body.location;
    const newItem = new ItemModel({
      title,
      description,
      location: {
        type: 'Point',
        coordinates: [lng, lat],
      },
      locationName,
      owner,
      date,
      available,
      image,
    });
    newItem.save();
    res.send(newItem);
    res.status(201);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send({
      message:
        'An unexpected error occurred while posting the item. Please try again later.',
    });
  }
};

// getting all items from database
export const allItems = async (req, res) => {
  try {
    const items = await ItemModel.find();
    res.send(items);
    res.status(200);
    return res.body;
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send({
      message:
        'An unexpected error occurred while getting the items. Please try again later.',
    });
  }
};

// getting item by id
export const itemById = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await ItemModel.findById(id);
    res.send(item);
    res.status(200);
    return res.body;
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send({
      message:
        'An unexpected error occurred while getting the item. Please try again later.',
    });
  }
};

// edit item
export const editItem = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      title,
      description,
      date,
      location,
      available,
      image,
      specialDiet,
    } = req.body;
    const updatedItem = await ItemModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          title: title,
          description: description,
          date: date,
          location: location,
          available: available,
          image: image,
          specialDiet: specialDiet,
        },
      },
      { new: true }
    );
    res.status(201);
    res.send(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send({
      message:
        'An unexpected error occurred while editing the item. Please try again later.',
    });
  }
};

// delete item
export const deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    await ItemModel.deleteOne({ _id: id });
    res.status(200);
    res.send('Item successfully deleted');
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send({
      message:
        'An unexpected error occurred while deleting the item. Please try again later.',
    });
  }
};
export default { deleteItem, editItem, itemById, allItems, postItem };
