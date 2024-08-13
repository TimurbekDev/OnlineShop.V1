import { fetchData } from "../postgres/postgres.js"

export async function addOrderItem(req,res) {
    
    await fetchData('INSERT INTO order_items(quantity,price,product_id,order_id) VALUES($1,$2,$3,$4)',
        req.body?.quantity,
        req.body?.price,
        req.body?.product_id,
        req.body?.order_id
    )

    res.status(200).send({
        message : 'Order-Items successfully created'
    })
}

export async function getOrderItems(req,res) {
    
    const orderId = req.params?.orderId ;

    const order_items = await fetchData('SELECT * FROM order_items')

    if(orderId){
        
        res.status(200).send({
            message : 'Ok',
            data : order_items.filter(o=>o.order_id == orderId)
        })

        return ;
    }

    res.status(200).send({
        message : 'Ok',
        data : order_items
    })
}



export async function updateOrderItemById(req,res) {
  
    const orderItemId = req.params?.orderItemId
    const orderItem = await fetchData('SELECT * FROM order_items WHERE id = $1',orderItemId)

    if(orderItem.length > 0){

        await fetchData('UPDATE order_items SET quantity = $1, price = $2, product_id = $3, order_id = $4 WHERE id = $5' ,
            req.body?.quantity,
            req.body?.price,
            req.body?.product_id,
            req.body?.order_id,
            orderItemId
        )

        res.send({
            message : 'Order-Items successfully updated'
        })

        return ;
    }

    res.status(404).send({
        message : 'Order-Item not found'
    })
}


export async function deleteOrderItem(req,res) {
    
    const orderItemId = req.params?.orderItemId
    const orderItem = await fetchData('SELECT * FROM order_items WHERE id = $1',orderItemId)

    if(orderItem.length > 0)
    {
        await fetchData('DELETE FROM order_items WHERE id = $1',orderItemId)

        res.status(200).send({
            message : 'Order-Items successfully deleted'
        })

        return ;
    }

    res.status(404).send({
        message : 'Order-Item not found'
    })
}