import express, {Router,Request, Response } from "express";

import bodyparser from "body-parser";

const router = Router();
router.use(bodyparser.json());

let usuarios: any[] = [
    { id: 1, nome: "Usuário 1" },
    { id: 2, nome: "Usuário 2" },
    { id: 3, nome: "Usuário 3" },
];

//lista usuários
router.get("/", (req: Request, res: Response) => {
    res.json(usuarios);
});

//add usuários
router.post("/cadastro", (req: Request, res: Response) => {
    console.log("Recebendo solicitação para adicionar usuário");
    
    try {
        const novoUsuario = {
            id: usuarios.length + 1,
            nome: req.body.nome
        };

        console.log("Novo usuário:", novoUsuario);

        if (!novoUsuario.nome) {
            console.log("Dados do usuário inválidos");
            res.status(400).send("Dados do usuário inválidos");
            return;
        }

        usuarios.push(novoUsuario);
        console.log("Usuário adicionado com sucesso:", novoUsuario);
        res.status(201).json(novoUsuario);
    } catch (error) {
        console.error("Erro ao processar a solicitação:", error);
        res.status(500).send("Erro interno do servidor");
    }
});

//buscar usuário por ID
router.get("/:id", (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === userId);

    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).send("Usuário não encontrado");
    }
});


//saudação
router.get("/saudacao/:nome", (req: Request, res: Response) => {
    const nomeUsuario = req.params.nome;
    res.send(`Olá, ${nomeUsuario}! Bem-vindo ao meu Web Service!`);
});


export default router;