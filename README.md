# MockDoc

![alt text](https://anh4n.github.io/antd-components/images/logo-light.png "Hangar")
[Powered by Hangar/Antd-Components](https://anh4n.github.io/antd-components/#/)

# Description

MockDoc generates custom API responses for your project.
You can fully manage your mocks and customize them. They were stored in a mongo database.

#RUN

```
$ docker run -it --rm \
    --name mockdoc \
    -p 3000:3000 \
    -e MONGO_SERVER="mongo" \
    -e MONGO_DATABASE="your-db-name" \
    -e MONGO_USER="user" \
    -e MONGO_PASSWORD="fairly long password" \
    -e MONGO_PORT="27017" \
    -e MONGO_AUTH="true" \
    mockdoc
```

# Environments

Name              | Description             |  Default |
----------------- |------------------------ |-----------
MONGO_SERVER      |  Mongodb Server Address |
MONGO_DATABASE    |  Mongodb Database Name  |
MONGO_USER        |  Mongodb Username       |
MONGO_PASSWORD    |  Mongodb Password       |
MONGO_PORT        |  Mongodb Port           | 27017
MONGO_AUTH        |  Authentication enabled | true

# Tool

![alt text](./screeshot.jpg "Hangar")
