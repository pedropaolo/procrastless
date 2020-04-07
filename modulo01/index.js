const express = require('express');

const server = express();

server.use(express.json());

/*

Middleware global: Que funciona independente de rotas; No caso, o parametro next
é utilizado para que o middleware não interrompa o fluxo da aplicação

*/

server.use((req , res , next) => {
  console.log(`Método utilizado: ${req.method}; URL: ${req.url}`);
  return next();
} )

/* 

Middleware que checa a existencia da chave/valor "name" dentro do corpo da requisição

*/

function CheckUserExist(req , res , next){

  if( !req.body.name) {
    return res.status(400).json({ error: 'User name is required! Skirl'})

  }

  return next();

}


/*

Metodo get HTTP para a URL "./teste"

*/

server.get('/teste', (req , res) => {
  return res.send('OIEEEEE');

})

/*

Acessando parametros passados na URL da requisicao
ex: localhost::3000/usuarios?nome=Pedroca


*/

server.get('/querys', (req , res) => {

  const { nome } = req.query;
  return res.send(`O nome eh ${nome}`);

})


/*


Acessando parametros passados na URL da requisicao
ex: localhost::3000/teste/1


*/

server.get('/parametros/:id', (req , res) => {

  const { id } = req.params;
  return res.send(`O parametro eh ${id}`);

})

/*

CRUD

*/

const usuarios = [ 'Balu' , 'Drogo', 'Mushu' , 'Max']
/*
server.get('/usuarios/:index' , (req , res) => {
  const { index } = req.params;
  return res.json(usuarios[index])
}) 
*/
server.get('/usuarios' , (req , res) => {
  return res.json(usuarios)
}) 


/*

Create user

*/

server.post('/usuarios' , CheckUserExist ,(req , res) => {

  const { name } = req.body;
  usuarios.push(name);

  return res.json(usuarios);
})

/*

Edit user: PUT ( Método de alteração)

*/

server.put('/usuarios/:index' , CheckUserExist , (req , res) => {

  const { name } = req.body;
  const { index } = req.params;

  //Sobrepondo o usuario que estava na posicao index
  usuarios[index] = name;

  return res.json(usuarios);
})


/*

DELETE user: 

*/

server.delete('/usuarios/:index', (req , res) => {

  const { index } = req.params;
  // SPLICE: Percorre o vetor ate a posição index ( 1 param ) e apaga uma posição ( 2 param )
  usuarios.splice(index , 1);

  return res.json(usuarios);
})

server.listen(3000);
