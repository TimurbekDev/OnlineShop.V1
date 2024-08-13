import { form } from "../utils/formidable.js";
import { fetchData } from "../postgres/postgres.js";

export async function addCategory(req, res) {

    const [fields, files] = await form.parse(req);

    await fetchData(
        "INSERT INTO categories (name, image_url, category_id) VALUES ($1, $2, $3)",
        fields.name[0],
        files.image_url[0].newFilename,
        fields?.category_id?.length ? fields.category_id[0] : null
      );
    
    res.status(201).send({
    message: "Category successfully created",
    });
}


export async function getAllCategories(req,res) {
    
    const categories = await fetchData(
        "SELECT * FROM categories WHERE category_id is null;"
      );
    
      for (const c of categories) {
        const childs = await fetchData(
          "SELECT * FROM categories WHERE category_id = $1",
          c.id
        );
        c.childs = childs;
      }

    res.status(200).send({
        message : 'Ok',
        data : categories
    })
}


export async function updateCategoryById(req,res) {

    const categoryId = req.params?.categoryId

    const [fields,files] = await form.parse(req)

    if(categoryId){

        await fetchData("UPDATE categories SET name = $1 , image_url = $2 , category_id = $3 WHERE id = $4",
            fields.name[0],
            files.image_url[0].newFilename,
            fields?.category_id?.length ? fields.category_id[0] : null,
            req.params?.categoryId || null
        )
    
        res.status(200).send({
            message: "Category successfully updated",
        });

        return ;
    }

    res.status(404).send({
        message : 'category not found'
    })
}

export async function deleteCategory(req,res) {

    const categoryId = req.params?.categoryId
    
    if(categoryId){
        await fetchData('DELETE FROM categories WHERE id = $1',categoryId)

        res.status(200).send({
            message : "Category successfully deleted"
        })

        return ;
    }

    res.status(404).send({
        message : 'category not found'
    })
}