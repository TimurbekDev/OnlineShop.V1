import { fetchData } from "../postgres/postgres.js";

export async function addPayment(req,res) {

    await fetchData('INSERT INTO payments(total_price,customer_id,contract_id) VALUES($1, $2, $3);',
        req.body?.total_price,
        req.body?.customer_id,
        req.body?.contract_id
    )

    res.status(200).send({
        message : 'Payment successfully created'
    })
}


export async function getPayments(req,res) {
    
    const customerId = req.params?.customerId ;

    const payments = await fetchData('SELECT * FROM payments')

    if(payments){
        
        res.status(200).send({
            message : 'Ok',
            data : payments.filter(p => p.customer_id == customerId)
        })

        return ;
    }

    res.send({
        message : 'Ok',
        data : payments
    })
}


export async function updatePayment(req,res) {
    
    const paymentId = req.params?.paymentId
    const payment = await fetchData('SELECT * FROM payments WHERE id = $1',paymentId)

    if(payment.length > 0){

        await fetchData('UPDATE payments SET total_price = $1, customer_id = $2,c ontract_id = $3 WHERE id = $4' ,
            req.body?.total_price,
            req.body?.customer_id,
            req.body?.contract_id
        )

        res.send({
            message : 'Payment successfully updated'
        })

        return ;
    }

    res.status(404).send({
        message : 'Payment not found'
    })
}

export async function deletePayment(req,res) {
    
    const paymentId = req.params?.paymentId
    const payment = await fetchData('SELECT * FROM payments WHERE id = $1',paymentId)

    if(payment.length > 0){

        await fetchData('DELETE FROM payments WHERE id = $1', paymentId)

        res.send({
            message : 'Payment successfully deleted'
        })

        return ;
    }

    res.status(404).send({
        message : 'Payment not found'
    })
}