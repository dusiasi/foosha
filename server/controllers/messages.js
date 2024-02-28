const MessageModel = require('../models/messages');

// posting new message to database
exports.postMessage = async (req, res) => {
  try {
    const message = req.body;
    const newMessage = new MessageModel(message);
    newMessage.save();
    res.send(newMessage);
    res.status(201);
  } catch (error) {
    console.error();
    res.send(error);
    res.status(500);
  }
}

// getting all messages from database
exports.allMessages = async (req, res) => {
  try {
    const messages = await MessageModel.find();
    res.send(messages);
    res.status(200);
    return res.body;
  } catch (error) {
    console.error();
    res.send(error);
    res.status(500);
  }
}

// getting messages by item
exports.messagesByThread = async (req, res) => {
  try {
    const id = req.params.thread;
    const messages = await MessageModel.find({thread: id});
    res.send(messages);
    res.status(200);
    return res.body;
  } catch (error) {
    console.error();
    res.send(error);
    res.status(500);
  }
}


