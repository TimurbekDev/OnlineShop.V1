import { fetchData } from "../postgres/postgres.js";
import { form } from "../utils/formidable.js";



export async function addCustomer(req,res) {

    const [fields, files] = await form.parse(req);

    await fetchData(`INSERT INTO customers (full_name,email,password,image_url) VALUES ($1,$2,$3,$4)`,
            fields.full_name[0],
            fields.email[0],
            fields.password[0],
            files.image_url ? files.image_url[0].newFilename : null
        );

    res.status(201).send({
        message: "Customer successfully created",
    });
}


export async function getAllCustomers(req,res) {

    const customers = await fetchData('SELECT * FROM customers')

    res.status(200).send({
        message : 'Ok',
        data : customers
    })
}


export async function updateCustomerById(req,res) {
    
    const customerId = req.params?.customerId
    const customer = await fetchData('SELECT * FROM customers WHERE id = $1',customerId)

    if(customer.length>0){

        const [fields , files] = await form.parse(req)

        await fetchData('UPDATE customers SET full_name = $1 , email = $2 , password = $3 , image_url = $4 WHERE id = $5;',
            fields.full_name[0],
            fields.email[0],
            fields.password[0],
            files.image_url ? files.image_url[0].newFilename : null,
            customerId
        )

        res.status(200).send({
            message : "Customer successfully updated"
        })

        return ;
    }
    

    res.status(404).send({
        message : "Customer not found"
    })
}


export async function deleteCustomer(req,res) {
    
    const customerId = req.params?.customerId
    const customer = await fetchData('SELECT * FROM customers WHERE id = $1',customerId)

    if(customer.length>0){

        await fetchData('DELETE FROM customers WHERE id = $1',customerId)

        res.status(200).send({
            message : "Customer successfully deleted"
        })

        return ;
    }
    

    res.status(404).send({
        message : "Customer not found"
    })
}