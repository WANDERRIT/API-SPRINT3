import OrderRepository from "../models/orderModel.js";

//findAll assíncrono
async function findAll(req, res) {
  try {
    const result = await OrderRepository.findAll();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Order not found" })
  }
}

//findOrder assincrono
async function findOrder(req, res) {
  try {
    const result = await OrderRepository.findByPk(req.params.id);
    if (!result) {
      return res.status(404).json({error: "Order not found"})
    }
    res.json(result);
  } catch(error){
    console.error('Error when searching for employee:', error);
    res.status(500).json({ error: "An error occurred while searching for an employee" });
  }
}

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
      status: req.body.status,
      code: req.body.code,
      service:req.body.service,
      adress: req.body.adress,
      street:req.body.street
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
      status: req.body.status,
      code: req.body.code,
      service:req.body.service,
      adress: req.body.adress,
      street:req.body.street
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

export default { findAll, addOrder, findOrder, updateOrder, deleteOrder, };
