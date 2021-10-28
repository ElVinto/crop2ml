# crop2ml
Représentation sémantique et modulaire des modèles de culture à l'aide d'un métalangage déclaratif

##### DEV #####
### Prerequisites ###
docker
docker-compose
node 16
docker-desktop if possible
pgadmin if possible
vscode if possible
vscode firefox debugger and chrome debugger extensions

### Installation
# Build and run db container
`docker-compose -f docker-compose.dev.yml up`
# Create Mongo DB
In new terminal
`docker exec -it crop2ml_db_1 /bin/sh`
`mongo -u "root" -p "password"`
##`CREATE DATABASE dbtest;`
##`\q`
Ctrl+D to exit the bash
# Init backend, create migration file and init DB
In "server" folder
Delete package-lock, node_modules if exist then
`npm install`
##`npm run typeorm:migration:generate -n init`
##`npm run schema:sync`
##`npm run seed:run`
# Init frontend
In "frontend" folder
delete package-lock and node_modules if exist then
`npm install`

### How to use
# Start db container
`docker-compose -f docker-compose.dev.yml up`
# Start backend
__DEBUG session__
##Open VSCode > go to Run & Debug tab > Select the wanted configuration (backend) > Run it.
##Place breakpoint wherever you want in the code directly in vscode and see the browser console in vscode.
__NORMAL session__
`cd server`
`npm run dev`
# Start frontend
`cd client`
`npm run serve`
__DEBUG session__
Open VSCode > go to Run & Debug tab > Select the wanted configuration (frontend firefox or frontedn chrome) > Run it.
Place breakpoint wherever you want in the code directly in vscode and see the browser console in vscode.
# Access app
__backend__ : http://localhost:5000
__frontend__ : http://localhost:8080


mongo "mongodb+srv://crop2mlcluster.6pf0x.mongodb.net/crop2ml" --username devInfoAtlas

collections :

## keywords
{ "_id" : ObjectId("617aad06ab301e506814ca69"), "keyword" : "Pierre", "modelIdValue" : "SQ.EnergyBalance" }
{ "_id" : ObjectId("617aad06ab301e506814ca76"), "keyword" : "MARTRE", "modelIdValue" : "SQ.EnergyBalance" }
{ "_id" : ObjectId("617aad06ab301e506814ca7e"), "keyword" : "INRA/LEPSE", "modelIdValue" : "SQ.EnergyBalance" }
{ "_id" : ObjectId("617aad06ab301e506814ca86"), "keyword" : "SQ", "modelIdValue" : "SQ.EnergyBalance" }
{ "_id" : ObjectId("617aad06ab301e506814ca8f"), "keyword" : "EnergyBalance", "modelIdValue" : "SQ.EnergyBalance" }
{ "_id" : ObjectId("617aad06ab301e506814cab8"), "keyword" : "Pierre", "modelIdValue" : "SQ.EnergyBalance.CanopyTemperature" }
{ "_id" : ObjectId("617aad06ab301e506814cac3"), "keyword" : "Martre", "modelIdValue" : "SQ.EnergyBalance.CanopyTemperature" }
{ "_id" : ObjectId("617aad06ab301e506814cacd"), "keyword" : "INRA/LEPSE", "modelIdValue" : "SQ.EnergyBalance.CanopyTemperature" }
{ "_id" : ObjectId("617aad06ab301e506814cad7"), "keyword" : "Montpellier", "modelIdValue" : "SQ.EnergyBalance.CanopyTemperature" }
{ "_id" : ObjectId("617aad06ab301e506814cae1"), "keyword" : "SQ", "modelIdValue" : "SQ.EnergyBalance.CanopyTemperature" }
{ "_id" : ObjectId("617aad06ab301e506814caeb"), "keyword" : "EnergyBalance", "modelIdValue" : "SQ.EnergyBalance.CanopyTemperature" }
{ "_id" : ObjectId("617aad06ab301e506814caf5"), "keyword" : "CanopyTemperature", "modelIdValue" : "SQ.EnergyBalance.CanopyTemperature" }
{ "_id" : ObjectId("617aad06ab301e506814cb1f"), "keyword" : "Pierre", "modelIdValue" : "SQ.EnergyBalance.Conductance" }
{ "_id" : ObjectId("617aad06ab301e506814cb29"), "keyword" : "Martre", "modelIdValue" : "SQ.EnergyBalance.Conductance" }
{ "_id" : ObjectId("617aad06ab301e506814cb33"), "keyword" : "INRA/LEPSE", "modelIdValue" : "SQ.EnergyBalance.Conductance" }
{ "_id" : ObjectId("617aad06ab301e506814cb45"), "keyword" : "Montpellier", "modelIdValue" : "SQ.EnergyBalance.Conductance" }
{ "_id" : ObjectId("617aad06ab301e506814cb4f"), "keyword" : "SQ", "modelIdValue" : "SQ.EnergyBalance.Conductance" }
{ "_id" : ObjectId("617aad06ab301e506814cb59"), "keyword" : "EnergyBalance", "modelIdValue" : "SQ.EnergyBalance.Conductance" }
{ "_id" : ObjectId("617aad06ab301e506814cb67"), "keyword" : "Conductance", "modelIdValue" : "SQ.EnergyBalance.Conductance" }
{ "_id" : ObjectId("617aad06ab301e506814cb97"), "keyword" : "Pierre", "modelIdValue" : "SQ.EnergyBalance.CropHeatFlux" }


## models
{ "_id" : ObjectId("617aad09ab301e506814d137"), "Attributs" : { "modelid" : "SQ.EnergyBalance.SoilHeatFlux", "name" : "SoilHeatFlux", "timestep" : "1", "version" : "1.0" }, "Description" : { "Title" : "SoilHeatFlux Model", "Authors" : "Pierre Martre", "Institution" : "INRA/LEPSE Montpellier", "Reference" : "Modelling energy balance in the wheat crop model SiriusQuality2:\r\n            Evapotranspiration and canopy and soil temperature calculations", "Abstract" : "The available energy in the soil " }, "Inputs" : { "Input" : [ { "Attributs" : { "name" : "netRadiationEquivalentEvaporation", "variablecategory" : "state", "description" : "net Radiation Equivalent Evaporation", "datatype" : "DOUBLE", "default" : "638.142", "min" : "0", "max" : "5000", "unit" : "g m-2 d-1", "uri" : "http://www1.clermont.inra.fr/siriusquality/?page_id=547", "inputtype" : "variable" } }, { "Attributs" : { "name" : "tau", "description" : "plant cover factor", "parametercategory" : "species", "datatype" : "DOUBLE", "default" : "0.9983", "min" : "0", "max" : "100", "unit" : "", "uri" : "http://www1.clermont.inra.fr/siriusquality/?page_id=547", "inputtype" : "parameter" } }, { "Attributs" : { "name" : "soilEvaporation", "description" : "soil Evaporation", "variablecategory" : "state", "datatype" : "DOUBLE", "default" : "448.240", "min" : "0", "max" : "10000", "unit" : "g m-2 d-1", "uri" : "http://www1.clermont.inra.fr/siriusquality/?page_id=547", "inputtype" : "variable" } } ] }, "Outputs" : { "Output" : { "Attributs" : { "name" : "soilHeatFlux", "description" : "soil Heat Flux ", "variablecategory" : "rate", "datatype" : "DOUBLE", "min" : "0", "max" : "10000", "unit" : "g m-2 d-1", "uri" : "http://www1.clermont.inra.fr/siriusquality/?page_id=547" } } }, "Algorithm" : { "Attributs" : { "language" : "Cyml", "platform" : "", "filename" : "algo/pyx/soilheatflux.pyx" } }, "Parametersets" : { "Parameterset" : { "Attributs" : { "name" : "set1", "description" : "some values in there" }, "Param" : { "_" : "0.9983", "Attributs" : { "name" : "tau" } } } }, "Testsets" : { "Testset" : { "Attributs" : { "name" : "first", "parameterset" : "set1", "description" : "some values in there" }, "Test" : { "Attributs" : { "name" : "test1" }, "InputValue" : [ { "_" : "638.142", "Attributs" : { "name" : "netRadiationEquivalentEvaporation" } }, { "_" : "448.240", "Attributs" : { "name" : "soilEvaporation" } } ], "OutputValue" : { "_" : "188.817", "Attributs" : { "name" : "soilHeatFlux", "precision" : "3" } } } } }, "metaData" : { "dirPath" : "server/data/packages/SQ_Energy_Balance-master/crop2ml", "xmlFName" : "unit.SoilHeatFlux.xml", "idProperty" : "modelid", "idValue" : "SQ.EnergyBalance.SoilHeatFlux", "keywords" : [ "Pierre", "Martre", "INRA/LEPSE", "Montpellier", "SQ", "EnergyBalance", "SoilHeatFlux" ], "tags" : [ "tagEnergy", "TagEnergyBalance" ], "packageName" : "SQ_Energy_Balance-master", "uploaderMail" : "vincent.armant@gmail.com" } }


## users
{ "_id" : ObjectId("617aabfb5975cd0015c07c08"), "email" : "vincent.armant@gmail.com", "password" : "$2a$10$CKLHSIVxvEVTc3rm0lYNGu.Rk3p2Ze10UweNsnwwLGD6Xxe2P8.7i", "category" : "user" }