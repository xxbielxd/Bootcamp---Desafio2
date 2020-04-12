const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title , url , techs } = request.body;
  const id = uuid();
  const repositorie = {
    id,
    title,
    url,
    techs,
    likes:0
  };
  repositories.push(repositorie);  
  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {

  const { title , url , techs } = request.body;
  const { id } = request.params;

  const index = repositories.findIndex(repositorie =>repositorie.id == id);

  if(index < 0 ){
    return response.status(400).json({ error:'Repositorie not found'});
  }
  repositories[index].title =  title; 
  repositories[index].url =  url; 
  repositories[index].techs =  techs; 
  
  return response.json(repositories[index]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex(repositorie =>repositorie.id == id);

  if(index < 0 ){
    return response.status(400).json({ error:'Repositorie not found'});
  }

  repositories.splice(index,1);

  response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const index = repositories.findIndex(repositorie =>repositorie.id == id);

  if(index < 0 ){
    return response.status(400).json({ error:'Repositorie not found'});
  }  
  repositories[index].likes += 1;
  const likes = repositories[index].likes
  response.json({likes});
});

module.exports = app;
