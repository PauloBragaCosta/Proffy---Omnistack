import express from 'express';
import cors from 'cors';
import routes from './routes';


const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

//http://localhost:3333/users
//GET: BUscar ou listar uma informação
//POST: Criar alguma nova informação
//PUT: Atualizar uma informação existente
// DELETE: Deletar uma informação existente

//Corpo (Request body): Dados para criação ou atualização de um registro
//Routs Params: Identifcar qual recurso eu quero atualziar ou deletar
//Quere Params: Paginação, Filtros, ordenação 


app.listen(3333);
