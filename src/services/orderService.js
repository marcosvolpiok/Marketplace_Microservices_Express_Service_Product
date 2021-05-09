class orderService {
    constructor(orderRepository, orderProductRepository, cartRepository, cartProductRepository) {
        this.orderRepository=orderRepository;
        this.orderProductRepository=orderProductRepository;
        this.cartRepository=cartRepository;
        this.cartProductRepository=cartProductRepository;
        this.sha1 = require('js-sha1');
      }
      
    list = async (req, res) => {
        const order=await this.orderRepository.list();
          
        return order;
    }


    addFromCart = async (req, res) => {
        const total = await this.cartProductRepository.getTotalAmountCart(req.body.idCart);
        const totalAmount = total[0].dataValues.totalAmount;

        const cart = await this.cartRepository.listById(req.body.idCart);
        if(cart){
            const orderNew = await this.orderRepository.add({
                idShop: cart.id_shop,
                idCustomer: cart.id_customer,
                idCart: req.body.idCart,
                totalAmount: totalAmount
            });

            const cartProduct = await this.cartProductRepository.listById(req.body.idCart);
            if(cartProduct){
                cartProduct.forEach(async prod => {
                    await this.orderProductRepository.add({
                        idOrder: orderNew.id,
                        idProduct: prod.id_product,
                        quantity: prod.quantity,
                        name: prod.product[0].name,
                        price: prod.product[0].price
                    });
                });

                //Updates state of cart
                await this.cartRepository.update({id: req.body.idCart, state: 1});
            }

            return {state: 'OK', detail: 'Tu pedido fue creado exitosamente', orderNew}
        } else {
            return {state: 'ERROR_CART_NOT_FOUND', detail: 'Tu pedido fue creado exitosamente'}
        }
    }

    listByIdCustomer = async (req, res) => {
        const order=await this.orderRepository.listByIdCustomer(req.params.id);
        order.forEach((ord, index)=>{
            order[index].dataValues.hash = this.sha1(ord.id + '_SALT_NYAN');
        });

        return order;
    }

    listByIdShop = async (req, res) => {
        const order=await this.orderRepository.listByIdShop(req.params.id);
        order.forEach((ord, index)=>{
            order[index].dataValues.hash = this.sha1(ord.id + '_SALT_NYAN');
        });
        
        return order;
    }

    listById = async (req, res) => {
        if(this.sha1(req.params.id + '_SALT_NYAN')===req.params.hash){
            const order=await this.orderRepository.listById(req.params.id);
            
            return order;
        }else{
            return {state: 'NOT_FOUND', message: 'ORDER NOT FOUND'}
        }
    }

}

module.exports = orderService;