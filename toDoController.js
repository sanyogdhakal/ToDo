const ToDoModel = require("../models/toDoModel"); // Ensure the correct relative path to the model file

module.exports.getToDos = async (req, res) => {
  try {
    const toDos = await ToDoModel.find();
    res.send(toDos);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};

module.exports.saveToDo = (req, res) => {
  const { toDo } = req.body;

  ToDoModel.create({ toDo })
    .then((data) => {
      console.log("Saved Successfully...");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.updateToDo = (req, res) => {
  const { id } = req.params;
  const { toDo } = req.body;

  ToDoModel.findByIdAndUpdate(id, { toDo }, { new: true })
    .then((data) => {
      res.send("Updated Successfully....");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.deleteToDo = (req, res) => {
  const { id } = req.params;

  ToDoModel.findByIdAndDelete(id)
    .then(() => {
      res.send("Deleted Successfully....");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};
