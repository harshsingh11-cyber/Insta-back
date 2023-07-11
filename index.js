import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';


const app = express();
const port = 4000;

dotenv.config();
app.use(cors());

const pass = process.env.MONGO_PASS;
app.use(express.json());

mongoose
    .connect(`mongodb+srv://harsh:${pass}@harsh-singh.yo9whrd.mongodb.net/InstaUser?retryWrites=true&w=majority`)
    .then(() => console.log(`Connected to The MongoDB`))
    .catch((err) => console.log("error found", err));

    const userSchema = new mongoose.Schema({
        email: {
            type: String,
            require: true
        },
        pass: {
            type: String,
            require: true
        },
      
    });
    const userModel = mongoose.model('user', userSchema);

    async function signIn(req, res) {
        const { email, pass } = req.body;
        try {
            const result = await userModel.create({
                email: email,
                pass: pass,
            });
            res.status(200).json({ user : result});
        }
        catch (error) {
            console.log("error");
            alert("some problem rise");
            res.status(500).json({ message: "Somthing went wrong" });
        }
    }


 app.get('/',(req,res)=>{
    res.send("hello guys");
 })
    app.post('/signin',signIn);

    app.listen(port, () => {
        console.log("server is started");
    });