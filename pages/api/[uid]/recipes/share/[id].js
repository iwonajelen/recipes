import { connectToDatabase } from "../../../../../util/mongodb";
import { ObjectID } from 'mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const {
    query: { uid, id },
  } = req;

  if (req.method === 'POST') {
    if(req.body && req.body.username) {
      const recipe = await db
        .collection("recipes")
        .findOne({"_id": new ObjectID(id)});

        const user = await db
          .collection("users")
          .findOne({ name: req.body.username });

        if(!user) {
          res.status(404).send({error: "User not found"});
        } else {
          const users = [...recipe.users, user._id.toString()].filter((item, pos, self) => {
            return self.indexOf(item) == pos;
          });
  
          await db
            .collection("recipes")
            .updateOne({"_id": new ObjectID(id)}, 
              { $set: {
                  users: users
              } });
  
          const recipeResponse = await db
              .collection("recipes")
              .findOne({"_id": new ObjectID(id)});    
        
          res.status(200).json(recipeResponse);
        }
    } else {
        res.status(400).send();
    }
  } else if(req.method === 'DELETE') {
    const recipe = await db
      .collection("recipes")
      .findOne({"_id": new ObjectID(id)});

    const users = [...recipe.users];

    const index = users.indexOf(uid);
    if (index > -1) {
      users.splice(index, 1);
    }
  
    await db
      .collection("recipes")
      .updateOne({"_id": new ObjectID(id)}, 
        { $set: {
            users: users
        } });

      res.status(200).json({});
  } else {
    res.status(400).send();
  }
};