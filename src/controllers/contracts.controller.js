import { fetchData } from "../postgres/postgres.js";

export async function addContract(req,res) {

    const { order_id, customer_id, monthly_payment_price, contract_type_id, contract_status, initial_payment_percentage ,total_price } = req.body;

    await fetchData(`INSERT INTO 
                    contract (customer_id, order_id, monthly_payment_price, contract_type_id, 
                        contract_status, initial_payment_percentage, total_price) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        customer_id,
        order_id ,
        monthly_payment_price,
        contract_type_id,
        contract_status,
        initial_payment_percentage,
        total_price
    )

    res.status(200).send({
        message : 'Contract successfully created'
    })

    return ;
}


export async function getContracts(req,res) {
    
    const contract_types = await fetchData('SELECT * FROM contract_types')

    res.status(200).send({
        message : 'Ok',
        data : contract_types
    })
}


export async function updateContract(req,res) {
    
    const contractId = req.params?.contractId
    const contract = await fetchData('SELECT * FROM contracts WHERE id = $1',contractId)

    const { order_id, customer_id, monthly_payment_price, contract_type_id, contract_status, initial_payment_percentage ,total_price } = req.body;


    if(contract.length > 0){

        await fetchData(`UPDATE contracts SET customer_id = $1, order_id = $2, monthly_payment_price = $3, contract_type_id = $4, 
                        contract_status = $5, initial_payment_percentage = $6, total_price = $7 WHERE id = $8`,
            customer_id,
            order_id ,
            monthly_payment_price,
            contract_type_id,
            contract_status,
            initial_payment_percentage,
            total_price,
            contractId
        )

        res.send({
            message : 'Contract successfully updated'
        })

        return ;
    }

    res.status(404).send({
        message : 'Contract not found'
    })
}



export async function deleteContract(req,res) {
    
    const contractId = req.params?.contractId
    const contract = await fetchData('SELECT * FROM contract_types WHERE id = $1',contractId)

    if(contract.length > 0){

        await fetchData('DELETE FROM contracts WHERE id = $1', contractId)

        res.send({
            message : 'Contract successfully deleted'
        })

        return ;
    }

    res.status(404).send({
        message : 'Contract not found'
    })
}