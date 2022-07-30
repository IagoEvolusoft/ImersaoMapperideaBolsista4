#!/bin/bash
nvm use 12
mapperidea push $1
echo "Gerando models"
mapperidea generate $1 mean mongoModel entityName=Pessoa > models/pessoa.model.js
mapperidea generate $1 mean mongoModel entityName=TipoMembroFamilia > models/tipoMembroFamilia.model.js
mapperidea generate $1 mean mongoModel entityName=Pais > models/pais.model.js
mapperidea generate $1 mean mongoModel entityName=UnidadeFederativa > models/unidadeFederativa.model.js
mapperidea generate $1 mean mongoModel entityName=Cidade > models/cidade.model.js
mapperidea generate $1 mean mongoModel entityName=Bairro > models/bairro.model.js
mapperidea generate $1 mean mongoModel entityName=Tutorial > models/tutorial.model.js
echo "Gerando api controllers"
mapperidea generate $1 mean apiController entityName=Pessoa > app/controllers/pessoa.controller.js
mapperidea generate $1 mean apiController entityName=TipoMembroFamilia > app/controllers/tipoMembroFamilia.controller.js
mapperidea generate $1 mean apiController entityName=Pais > app/controllers/pais.controller.js
mapperidea generate $1 mean apiController entityName=UnidadeFederativa > app/controllers/unidadeFederativa.controller.js
mapperidea generate $1 mean apiController entityName=Cidade > app/controllers/cidade.controller.js
mapperidea generate $1 mean apiController entityName=Bairro > app/controllers/bairro.controller.js
mapperidea generate $1 mean apiController entityName=Tutorial > app/controllers/tutorial.controller.js
