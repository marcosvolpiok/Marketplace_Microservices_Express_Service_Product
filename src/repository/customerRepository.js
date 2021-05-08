const Interface = require('es6-interface');
const baseRepository = require('./baseRepository');

class customerRepository extends Interface(baseRepository) {
    constructor(Customer, Sequelize, sequelize) {
        super();
        this.Customer=Customer;
        this.Sequelize=Sequelize;
        this.sequelize=sequelize;
        this.Op = this.Sequelize.Op;
        
    }

    async listByIdUser (idUser) {
        const customer = await this.Customer.findAll({ attributes: ['id', 'id_cart', 'id_product', 'quantity'],
        where: {
            id: idUser 
        }
     });

     return customer;
    }
    

    async list () {
        const customer = await this.Customer.findAll();

        return customer;
    }

    async find (params) {
        const customer = await this.Customer.findAll(params);

        return customer;
    }

    async findOne (params) {
        const customer = await this.Customer.findOne(params);

        return customer;
    }
    

    async add (params) {
        const customerNew = await this.Customer.create({
            first_name: params.first_name,
            last_name: params.last_name,
            password: params.password,
            mail: params.mail,
            address: params.address,
            phone: params.phone
        });

        return customerNew;
    }

    async update (params) {
        const customer = await this.Customer.findByPk(params.id);
        if(params.first_name){
            customer.first_name=params.first_name;
        }

        if(params.last_name){
            customer.last_name=params.last_name;
        }

        if(params.password){
            const hashPassword = await this.bcrypt.hash(params.password, 10);
            customer.password=hashPassword;
        }

        if(params.mail){
            customer.mail=params.mail;
        }

        if(params.address){
            customer.address=params.address;
        }

        if(params.phone){
            customer.phone=params.phone;
        }

        await customer.save();

        return customer;
    }

    async delete (params) {
    }
}

module.exports = customerRepository;