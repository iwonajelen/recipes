import { connectToDatabase } from "../../../../util/mongodb";
import { ObjectID } from 'mongodb';

export default async (req, res) => {
    const { db } = await connectToDatabase();

    const {
      query: { uid, id },
    } = req

    if (req.method === 'PUT') {
        if(req.body && req.body.title) {
            const recipe = await db
              .collection("recipes")
              .updateOne({"_id": new ObjectID(id)}, 
                { $set: {
                    title: req.body.title,
                    description: req.body.description || "",
                    url: req.body.url,
                    ingredients: req.body.ingredients || [],
                } });
          
            res.status(200).json(recipe.ops);
        } else {
            res.status(400).send();
        }
    } else if (req.method === 'DELETE')  {
      const recipe = await db
        .collection("recipes")
        .deleteOne({"_id": new ObjectID(id), "createdBy": uid });
    
        res.status(201).json(recipe);
    } else if (req.method === 'GET')  {
        const recipe = await db
          .collection("recipes")
          .findOne({"_id": new ObjectID(id)});
      
        res.status(200).json(recipe);
    } else {
        res.status(400).send();
    }
  }
  