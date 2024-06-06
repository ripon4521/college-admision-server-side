


const express = require('express')
require('dotenv').config()

const app = express()

const cors = require('cors')
const port = process.env.PORT ||5000;

app.use(cors());
app.use(express.json())





console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);

const { MongoClient, ServerApiVersion, ObjectId  } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b1mistq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// mongodb+srv://<username>:<password>@cluster0.b1mistq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const AllCollegeCollection = client.db('boot_Camp').collection("collegeDetailsDb");
    const testimonialCollection = client.db('boot_Camp').collection("testimonials");
    const allUsersCollection = client.db('boot_Camp').collection("users");
    const allAdmissionCollection = client.db('boot_Camp').collection("admission");


    
   

    app.get("/allCollegeData" , async(req , res)=>{
      const cursur = AllCollegeCollection.find();
      const result = await cursur.toArray();
      res.send(result)
    })
   

    app.get("/testimonials" , async(req , res)=>{
      const cursur = testimonialCollection.find();
      const result = await cursur.toArray();
      res.send(result)
    })
    app.get("/users" , async(req , res)=>{
      const cursur = allUsersCollection.find();
      const result = await cursur.toArray();
      res.send(result)
    })
    app.get("/admission" , async(req , res)=>{
      const cursur = allAdmissionCollection.find();
      const result = await cursur.toArray();
      res.send(result)
    })

 




    app.get("/allCollegeData/:id" , async(req , res)=>{
      const   id  = req.params.id;
      const queary = {_id : new ObjectId(id)}
      const result = await AllCollegeCollection.findOne(queary);
      res.send(result)
    })


    // app.put("/update/:id" , async(req , res)=>{
    //   const   id  = req.params.id;
    //   const filter = {_id : new ObjectId(id)}
    //   const option = {upsert: true}
    //   const updateBrand = req.body;
    //   const brand ={
    //     $set:{
    //       productName:updateBrand.productName,
    //        brandName:updateBrand.brandName ,
    //         typeName:updateBrand.typeName ,
    //          rating:updateBrand.rating,
    //          url:updateBrand.url,
    //          price:updateBrand.price
    //     }
    //   }
    //   const result = await bransCollection.updateOne(filter,brand,option);
    //   res.send(result)
    // })

    

    // app.delete("/allCollegeData/:id" , async(req , res)=>{
    //   const   id  = req.params.id;
    //   const queary = {_id : new ObjectId(id)}
    //   const result = await AllCollegeCollection.deleteOne(queary);
    //   res.send(result)
    // })

  





    app.post("/testimonials", async(req , res)=> {
      const brand = req.body;
      const result = await testimonialCollection.insertOne(brand)  
    // console.log(brand); 
      res.send(result)
  })
    app.post("/admission", async(req , res)=> {
      const brand = req.body;
      const result = await allAdmissionCollection.insertOne(brand)  
    // console.log(brand); 
      res.send(result)
  })



    app.post("/users", async(req , res)=> {
      const brand = req.body;
      const result = await allUsersCollection.insertOne(brand)  
    // console.log(brand); 
      res.send(result)
  })









    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}






run().catch(console.dir);





app.get('/', (req, res) => {
  res.send('Hello World!ddd')

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})