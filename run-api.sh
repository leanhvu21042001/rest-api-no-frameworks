curl --silent localhost:3000/heroes

curl --silent -X POST \
-d '{"name": "Flash","age": 40,"power": "speed"}' \
localhost:3000/heroes

curl --silent -X POST \
-d '{"invalid json payload"}' \
localhost:3000/heroes
