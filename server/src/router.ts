import express from 'express';
const router = express.Router();
import controllerUser from './controllers/users';
import controllerItems from './controllers/items';
import controllerMessages from './controllers/messages';
import controllerConversations from './controllers/conversations';

router.post('/user', controllerUser.createUser); // in use
router.post('/user/login', controllerUser.login); // in use
router.put('/user/:id', controllerUser.editUser); // in use
router.get('/user/:id', controllerUser.userById); // in use

router.post('/items', controllerItems.postItem); // in use
router.get('/items', controllerItems.allItems); // in use
router.get('/items/:id', controllerItems.itemById); // in use
router.put('/items/:id', controllerItems.editItem); // in use
router.delete('/items/:id', controllerItems.deleteItem); // in use

router.post('/items/messages', controllerMessages.postMessage); // in use
router.get('/conversations', controllerConversations.allConversations); // in use

export default router;
