const express = require('express')
const router = express.Router()
const controllerUser = require('./controllers/users');
const controllerItems = require('./controllers/items');
const controllerMessages = require('./controllers/messages');

router.post('/user', controllerUser.createUser);
router.get('/user/:id', controllerUser.login);
router.put('/user/:id', controllerUser.editUser);

router.post('/items', controllerItems.postItem);
router.get('/items', controllerItems.allItems);
router.get('/items/:id', controllerItems.itemById);
router.get('/items/mine/:id', controllerItems.itemByOwner);
router.put('/items/:id', controllerItems.editItem);
router.delete('/items/:id', controllerItems.deleteItem);

router.post('/messages', controllerMessages.postMessage);
router.get('/messages', controllerMessages.allMessages);
router.get('/messages/:thread', controllerMessages.messagesByThread);

module.exports = router;