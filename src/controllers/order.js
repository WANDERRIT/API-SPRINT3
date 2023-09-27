import OrderRepository from "../models/orderModel.js";

// function findAll(req, res) {
//   OrderRepository.findAll().then((result) => res.json(result));
// }

//findAll assíncrono
async function findAll(req, res) {
  try {
    const result = await OrderRepository.findAll();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Order not found" })
  }
}

// function findOrder(req, res) {
//   OrderRepository.findByPk(req.params.id).then((result) => res.json(result));
// }
//findOrder assincrono
async function findOrder(req, res) {
  try {
    const result = await OrderRepository.findByPk(req.params.id);
    if (!result) {
      return res.status(404).json({error: "Order not found"})
    }
    res.json(result);
  } catch(error){
    console.error('Erro ao buscar funcionário:', error);
    res.status(500).json({ error: "An error occurred while searching for an employee" });
  }
}


// function addOrder(req, res) {
//   OrderRepository.create({
//     name: req.body.name,
//     cpf: req.body.cpf,
//     phone: req.body.phone,
//     email: req.body.email,
//     plan: req.body.plan,
//     time: req.body.time,

//   }).then((result) => res.json(result));
// }

//addOrder assincrono
async function addOrder(req, res){
  try{
    const result = await OrderRepository.create({
      name: req.body.name,
      cpf: req.body.cpf,
      phone: req.body.phone,
      email: req.body.email,
      plan: req.body.plan,
      time: req.body.time,
    });
    res.json(result);
  } catch(error){
    console.error('An error occurred while adding an order', error);
    res.status(500).json({ error: 'An error occurred while adding an order' });
  }
}


async function updateOrder(req, res) {
  await OrderRepository.update(
    {
      name: req.body.name,
      cpf: req.body.cpf,
      phone: req.body.phone,
      email: req.body.email,
      plan: req.body.plan,
      time: req.body.time,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );

  OrderRepository.findByPk(req.params.id).then((result) => res.json(result));
}

async function deleteOrder(req, res) {
  await OrderRepository.destroy({
    where: {
      id: req.params.id,
    },
  });

  OrderRepository.findAll().then((result) => res.json(result));
}

export default { findAll, addOrder, findOrder, updateOrder, deleteOrder };
