import express, {Request, Response} from "express";

const app = express()

app.get("/", (req: Request, res:Response) => {
    res.send("Bem-vindo ao meu web service!")
});

const porta: number = 3000;

app.listen(porta, () => {
    console.log(`Servidor rodando na porta http://localhost:${porta}`);
});
