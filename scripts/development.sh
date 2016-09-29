#!/bin/bash

CONTAINER_NAME=drovideo-backend-container_DEV
WEBSITE_ASSETS=~/Development/drovideo-frontend/assets

docker stop ${CONTAINER_NAME}
docker rm ${CONTAINER_NAME}

docker run -d -p 3000:3000 --name ${CONTAINER_NAME} -e "NODE_ENV=development" -v ${WEBSITE_ASSETS}:/static/ -v `pwd`:/app library/node:5.0 /app/scripts/dev_entrypoint.sh
