Parameters: MONGO_USR: MongoDB username, MONGO_PWD: MongoDB password,
MONGO_URI:MongoDB URI, DB_NAME: Database name

API Endpoints

    DELETE /deleteCliente/:id: Delete a client with the specified ID.
    POST /addCliente: Add a new client.
    POST /addGestor: Add a new manager.
    POST /addHipoteca: Add a new mortgage.
    PUT /ingresarDinero/:id/:cantidad: Deposit a certain amount of money to a client's account.
