import { fetchData } from "../postgres/postgres.js";

export async function addOrder(req,res) {

    await fetchData('INSERT INTO orders(address,order_status,customer_id) VALUES($1,$2,$3)',
        req.body?.address,
        req.body?.order_status || 'pending',
        req.body?.customer_id
    )

    res.send({
        message : 'Order successfully created'
    })
}


export async function getOrders(req,res) {

    const customerId = req.params?.customerId ;

    const orders = await fetchData('SELECT * FROM orders')

    if(customerId){
        
        res.status(200).send({
            message : 'Ok',
            data : orders.filter(o=>o.customer_id == customerId)
        })

        return ;
    }

    res.send({
        message : 'Ok',
        data : orders
    })
}



export async function updateOrderById(req,res) {
    
    const orderId = req.params?.orderId
    const order = await fetchData('SELECT * FROM orders WHERE id = $1',orderId)

    if(order.length > 0){

        await fetchData('UPDATE orders SET address = $1,order_status = $2, customer_id = $3 WHERE id = $4;',
            req.body?.address,
            req.body?.order_status || 'pending',
            req.body?.customer_id,
            orderId
        )

        res.status(200).send({
            message : 'Order successfully updated'
        })

        return ;
    }

    res.status(404).send({
        message : 'Order not found'
    })
}

export async function deleteOrder(req,res) {
    
    const orderId = req.params?.orderId
    const order = await fetchData('SELECT * FROM orders WHERE id = $1',orderId)

    if(order.length > 0){

        await fetchData('DELETE FROM orders WHERE id = $1',orderId)

        res.status(200).send({
            message : 'Order successfully deleted'
        })

        return ;
    }

    res.status(404).send({
        message : 'Order not found'
    })
}