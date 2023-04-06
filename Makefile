
# (private) .env definitions include DB_USER, DB_PASSWORD
include .env

# public .env definitions such as port, DB image
include public.env

TMP_FOLDER=.make

#setup make environment
$(TMP_FOLDER):
	mkdir $(TMP_FOLDER)

# --- Docker creation and starting.

${TMP_FOLDER}/docker.dependencies: $(TMP_FOLDER)
	docker pull ${DB_IMAGE}
	echo "got dependencies" > ${TMP_FOLDER}/docker.dependencies

${TMP_FOLDER}/build.postgres: ${TMP_FOLDER}/docker.dependencies
	docker run --name ${DB_CONTAINER_NAME} -p ${DOCKER_PORT_MAPPING} -e POSTGRES_USER=${DB_USER} -e POSTGRES_PASSWORD=${DB_PASSWORD} -d ${DB_IMAGE}
	echo "build postgres" > ${TMP_FOLDER}/build.postgres 

${TMP_FOLDER}/start.postgres: ${TMP_FOLDER}/build.postgres
	echo "started postgres" > ${TMP_FOLDER}/start.postgres
	docker start ${DB_CONTAINER_NAME}

docker_start: ${TMP_FOLDER}/start.postgres
	echo "started"


# --- Docker removal and cleanup.

docker_stop:
	del ${TMP_FOLDER}/start.postgres
	docker stop ${DB_CONTAINER_NAME}

docker_remove_container:
	del ${TMP_FOLDER}/build.postgres
	docker rm ${DB_CONTAINER_NAME}

docker_clean:
	del ${TMP_FOLDER}\\start.postgres
	del ${TMP_FOLDER}\\build.postgres
	docker stop ${DB_CONTAINER_NAME}
	docker rm ${DB_CONTAINER_NAME}


# --- DB creation

${TMP_FOLDER}/db.build: ${TMP_FOLDER}/start.postgres
	docker exec -it ${DB_CONTAINER_NAME} createdb --username=${DB_USER} --owner=${DB_USER} ${DB_DATABASE_NAME}
	echo "db created" >> ${TMP_FOLDER}/db.build

db_schema: ${TMP_FOLDER}/db.build
	ts-node postgres.sql/build_db_script.ts ${DB_HOST} ${DB_PORT} ${DB_DATABASE_NAME} ${DB_USER} ${DB_PASSWORD}