
# build and development

## development commands

- first checkout the latest develop branch from git

- install packages 
```
npm install 
```

- configure env
```
cp .env.example .env
```
and configure your database connection

-  run migrations
```
npm run migration:run
```

-  run authentication seed 
```
npm run seed auth
```

- run the project with
```
npm run start:dev
```

- visit the swagger file and test your api links 
```
http://localhost:9797/api
```
