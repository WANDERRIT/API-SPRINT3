import EmployeeRepository from '../models/employeeModel.js'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

//FindAll assincrono
async function findAll(req, res) {
    try {
        const result = await EmployeeRepository.findAll()
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "employee not found" })
    }
}

//findEmployee assíncrono
async function findEmployee(req, res) {
    try {
        const result = await EmployeeRepository.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ error: 'Employee not found' });

        }
        res.json(result);
    } catch (error) {
        console.error('Error when searching for employee:', error);
        res.status(500).json({ error: 'An error occurred when searching for an employee' });
    }
}

//addEmployee assíncrono
async function addEmployee(req, res) {
    try {

        const { accessCode, password } = req.body;

        const oldEmployee = await EmployeeRepository.findOne({
            where: { accessCode: accessCode }
        });

        if (oldEmployee) {
            return res.status(409).json({ error: "employee already added" })
        };

        const salt = 10;

        const encryptedPassword = await bcrypt.hash(password, salt);

        const employee = await EmployeeRepository.create({
            password: encryptedPassword,
            accessCode: accessCode,
        });
        const token = jwt.sign({ employee_id: employee.id, accessCode },
            process.env.TOKEN_KEY,
            { expiresIn: "1h" });

        res.status(201).json({ employee: employee, token: token});
    } catch (error) {
        res.status(500).json({ error: "employee not added" });
    }
}

async function login(req, res) {
    try {
        const { accessCode, password } = req.body;

        const employee = await EmployeeRepository.findOne({
            where: { accessCode: accessCode }
        })

        if (employee && (await bcrypt.compare(password, employee.password))) {
            const token = jwt.sign(
                { employeeId: employee.id, accessCode },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "1h",
                }
            )

            return res.status(200).json({ token: token })
        }

        res.status(401).json({ error: "Invalid credential" })
    } catch (error) {
        res.status(500).json({ error: "Employee not added" });
    }
}


async function getbyId(req, res) {
    try {
        const id = req.params.id;
        const employee = await EmployeeRepository.findByPk(id);

        if (!employee) {
            return res.status(404).json({
                messege: 'There are no registered users'
            });
        }
        res.status(200).json(employee);
    } catch (error) {
        console.log(error)
        res.status(500).json({ messege: 'Internal error' });
    }
}

export default { findEmployee, findAll, addEmployee, login, getbyId }
