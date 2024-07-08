# simple.product.api


## Full api/db run
```
docker-compose up -d
```

## Run solo api

```
docker build . --tag simple.product.api
docker run -d -dp 3000:3000 --name simple.product.api simple.product.api
```