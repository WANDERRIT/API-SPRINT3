import EmployeeRepository from '../models/employeeModel.js'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

 //FindAll assincrono
async function findAll(req, res) {
    try {
        const result = await EmployeeRepository.findAll()
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "funcionário não encontrado" })
    }
}

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

async function login(req, res) {
    try {
        const { accessCode, password } = req.body;

        const employee = await EmployeeRepository.getOne({
            where: {accessCode: accessCode}
        })

        if (employee && (await bcrypt.compare(password, employee.password))) {
            const token = jwt.sign(
                {employeeId: employee.id, accessCode},
                process.env.TOKEN_KEY, 
                {
                    expiresIn: "5h",
                }
            )
            res.cookie("jwt", token);
            // return res.status(200).json({ token: token })
        }

        res.status(401).json({ error: "Invalid credential" })
    } catch (error) {
        res.status(500).json({ error: "Employee not added" });
    }
}

export default { findEmployee, findAll, addEmployee, login }
