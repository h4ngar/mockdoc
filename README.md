# MockDoc

![alt text](https://anh4n.github.io/antd-components/images/logo-light.png "Hangar")
[Powered by Hangar/Antd-Components](https://anh4n.github.io/antd-components/#/)

# Description

MockDoc generates custom API responses for your project.
You can fully manage your mocks and customize them. They were stored in a mongo database.

#### RUN

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

![alt text](./screenshot.png "Hangar")

Auto generated mock url:
https://localhost:3000/mock/5eef767754b2a300bfa9de08
https://localhost:3000/mock/mypath/?myparam=test&otherparam=test2

# Usage

```bash
$ curl https://localhost:3000/mock/5eef767754b2a300bfa9de08
< HTTP/1.1 200 OK
< Content-Type: application/json; charset=UTF-8
{"banner":[{"banner":"mock-doc-banner.jpg"}]}
```

#### Quick Edit
If you want edit your mock quickly without searching it in the database, just replace "mock" with "mock-edit" in the path
and open it in your browser. The edit form for your mock will be opend in the tool.

https://localhost:3000/mock-edit/5eef767754b2a300bfa9de08
