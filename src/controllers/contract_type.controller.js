import { fetchData } from "../postgres/postgres.js";

export async function addContractType(req,res) {

    const duration = req.body?.duration
    const percentage = req.body?.percentage

    if(!isNaN(duration) && !isNaN(percentage)){

        await fetchData('INSERT INTO contract_types(duration,percentage) VALUES($1, $2);',
            duration > 0 ? duration : 0,
            percentage > 0 ? percentage : 0
        )

        res.status(200).send({
            message : 'Contract-Type successfully created'
        })

        return ;
    }

    res.send({
        message : 'duration and percentage must be number'
    })
}


export async function getContractTypes(req,res) {
    
    const contract_types = await fetchData('SELECT * FROM contract_types')

    res.status(200).send({
        message : 'Ok',
        data : contract_types
    })
}


export async function updateContractType(req,res) {
    
    const contractTypeId = req.params?.contractTypeId
    const contractType = await fetchData('SELECT * FROM contract_types WHERE id = $1',contractTypeId)

    if(contractType.length > 0){

        await fetchData('UPDATE contract_types SET duration = $1, percentage = $2 WHERE id = $3' ,
            req.body?.duration > 0 ? duration : 0,
            req.body?.percentage > 0 ? percentage : 0
        )

        res.send({
            message : 'Contract Type successfully updated'
        })

        return ;
    }

    res.status(404).send({
        message : 'Contract Type not found'
    })
}

export async function deleteContractType(req,res) {
    
    const contractTypeId = req.params?.contractTypeId
    const contractType = await fetchData('SELECT * FROM contract_types WHERE id = $1',contractTypeId)

    if(contractType.length > 0){

        await fetchData('DELETE FROM contract_types WHERE id = $1', contractTypeId)

        res.send({
            message : 'Contract Type successfully deleted'
        })

        return ;
    }

    res.status(404).send({
        message : 'Contract Type not found'
    })
}