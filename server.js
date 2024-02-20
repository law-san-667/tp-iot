import cors from 'cors';
import { drizzle } from "drizzle-orm/postgres-js";
import express from 'express';
import postgres from "postgres";
import { data } from "./schema.js";

const app = express();

const corsOptions ={
  //allow from all
    origin: '*',
    credentials:true,            
    //access-control-allow-credentials:true
    optionSuccessStatus:200,
    //allow everything
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",

}
app.use(cors(corsOptions));


const queryClient = postgres("postgresql://tp_iot:cXV2GBbBooJF0zyNvBJK9g@mauve-cricket-13002.8nj.gcp-europe-west1.cockroachlabs.cloud:26257/tp_iot?sslmode=verify-full");
const db = drizzle(queryClient);


app.get('/getData', async ( _, res) => {
  try {
    const result = await db.select().from(data);
    console.log('Résultat:', result);
    res.json(result);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 5000 || 3000 || 5001 || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
