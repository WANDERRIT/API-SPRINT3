import EmployeeRepository from '../models/employeeModel.js'

// function findAll(req, res) {
//     EmployeeRepository.findAll().then((result) => res.json(result));
// }
 //FindAll assincrono
async function findAll(req, res) {
    try {
        const result = await EmployeeRepository.findAll()
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "funcionário não encontrado" })
    }
}


// function findEmployee(req, res) {
//     EmployeeRepository.findByPk(req.params.id).then((result) => res.json(result));
// }
//findEmployee assíncrono
async function findEmployee(req, res) {
    try {
      const result = await EmployeeRepository.findByPk(req.params.id);
      if (!result) {
       return res.status(404).json({ error: 'Funcionário não encontrado' });
        
      }
      res.json(result);
    } catch (error) {
      console.error('Erro ao buscar funcionário:', error);
      res.status(500).json({ error: 'Ocorreu um erro ao buscar funcionário' });
    }
  }


// function addEmployee(req, res) {
//     EmployeeRepository.create({
//         password: req.body.password,
//         accessCode: req.body.accessCode,
//     }).then((result) => res.json(result));
// }

//addEmployee assíncrono
async function addEmployee(req, res){
    try{
        const result = await EmployeeRepository.create({
            password: req.body.password,
            accessCode: req.body.accessCode,  
        });
        res.json(result);
    } catch(error){
        res.status(500).json({ error: "funcionario não adicionado" });
    }
}


export default { findEmployee, findAll, addEmployee }
