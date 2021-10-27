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
##`docker exec -it crop2ml_db_1 /bin/sh`
##`psql -U postgres`
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