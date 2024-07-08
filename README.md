# simple.product.api


## To Run
```
docker-compose up -d
```

## Run local api

```
docker build . --tag simple.product.api
docker run -d -dp 3000:3000 --name simple.product.api simple.product.api
```