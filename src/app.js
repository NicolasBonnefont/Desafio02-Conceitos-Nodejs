const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());


const repositories = [];

app.get("/repositories", (request, response) => {
  console.log(repositories)
  return response.send(repositories)
});

app.post("/repositories", (request, response) => {
  const  {title, url, techs} = request.body
  const likes = 0
  const repositorie = {id:uuid(),title, url, techs, likes}

  repositories.push(repositorie)

  return response.status(200).send(repositorie)
  
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params
  const {title, url, techs} = request.body

  const repositorieIndex = repositories.findIndex(repositorie =>repositorie.id === id)

  if(repositorieIndex < 0 ){
    return response.status(400).json({Mensagem:'ID DE REPOSITORIO INVALIDO !'})
  }

  const {likes} = repositories.find(repositorie =>repositorie.id === id)

  const repositorie = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories[repositorieIndex] = repositorie

  return response.json(repositorie)

});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params  

  const repositorieIndex = repositories.findIndex(repositorie =>repositorie.id === id)

  if(repositorieIndex < 0 ){
    return response.status(400).json({Mensagem:'ID DE REPOSITORIO INVALIDO !'})
  }

  repositories.splice(repositorieIndex,1)

  return response.status(204).send()

});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params

  const repositorieIndex = repositories.findIndex(repositorie =>repositorie.id === id)

  if(repositorieIndex < 0 ){
    return response.status(400).json({Mensagem:'ID DE REPOSITORIO INVALIDO !'})
  }

  let {title,url,techs,likes} = repositories.find(repositorie =>repositorie.id === id)

  likes ++

  const repositorie = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories[repositorieIndex] = repositorie

  return response.json(repositorie)

});

module.exports = app;
