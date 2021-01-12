#!/bin/bash

cd docker
if [[ "$@" =~ "-rebuild" ]]
then
    echo "Rebuilding Docker Image"
    docker build --no-cache -t do:mongo .
else
    docker ps | grep 'do_mongo' &> /dev/null
    if [ $? == 0 ]; then
        echo "Database docker exists yet, running istance."
        docker start do_mongo
    else
        echo "Running MongoDB."
        docker build -t do:mongo .
        docker run --restart=unless-stopped -d --name=do_mongo -dit -p 27017:27017 do:mongo
    fi
fi

docker exec do_mongo mongod --bind_ip_all &