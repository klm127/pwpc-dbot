# (private) .env definitions include DB_USER, DB_PASSWORD
include .env

# --- Docker creation and starting.

# build image
bi:
	docker build -t ${DOCKER_CUSTOM_IMAGE} --rm \
	--build-arg image=${DB_IMAGE} \
	--build-arg port=${DB_PORT} \
	--build-arg user=${DB_USER} \
	--build-arg password=${DB_PASSWORD} \
	--build-arg dbname=${DB_DATABASE_NAME} .

# remove image
rmi:
	docker image rm ${DOCKER_CUSTOM_IMAGE}

# start container
sc:
	docker run --name ${DB_CONTAINER_NAME} \
	-p ${DOCKER_PORT_MAPPING} \
	-e POSTGRES_USER=${DB_USER} \
	-e POSTGRES_PASSWORD=${DB_PASSWORD} \
	-d ${DOCKER_CUSTOM_IMAGE}

# stop container
stc:
	docker stop ${DB_CONTAINER_NAME}

# remove container
rmc:
	docker rm ${DB_CONTAINER_NAME} --force

# build all
ba_docker:
	$(MAKE) bi
	$(MAKE) sc

clean_docker:
	$(MAKE) rmc
	$(MAKE) rmi


# --- Utility makes

# psql shell \l : list databses
psql:
	docker exec -it ${DB_CONTAINER_NAME} psql

# linux shell
bash:
	docker exec -it ${DB_CONTAINER_NAME} /bin/bash
