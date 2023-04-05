
# (private) .env definitions include DB_USER, DB_PASSWORD
include .env

# public .env definitions such as port, DB image
include public.env

TMP_FOLDER=docker_records

# --- Docker creation and starting.

${TMP_FOLDER}\\docker.dependencies:
	docker pull ${DB_IMAGE}
	mkdir ${TMP_FOLDER}
	echo "got dependencies" > ${TMP_FOLDER}\\docker.dependencies

${TMP_FOLDER}\\build.postgres: ${TMP_FOLDER}\\docker.dependencies
	docker run --name ${DB_CONTAINER_NAME} -p ${DB_PORT} -e POSTGRES_USER=${DB_PASSWORD} -e POSTGRES_PASSWORD=${DB_PASSWORD} -d ${DB_IMAGE}
	echo "build postgres" > ${TMP_FOLDER}\\build.postgres 

${TMP_FOLDER}\\start.postgres : ${TMP_FOLDER}\\build.postgres
	docker start ${DB_CONTAINER_NAME}
	echo "stop postgres" > ${TMP_FOLDER}\\start.postgres

docker_start: ${TMP_FOLDER}\\start.postgres
	echo "started"


# --- Docker removal and cleanup.

docker_stop:
	del ${TMP_FOLDER}\\start.postgres
	docker stop ${DB_CONTAINER_NAME}

docker_remove_container:
	del ${TMP_FOLDER}\\build.postgres
	docker rm ${DB_CONTAINER_NAME}

docker_clean:
	del ${TMP_FOLDER}\\start.postgres
	del ${TMP_FOLDER}\\build.postgres
	docker stop ${DB_CONTAINER_NAME}
	docker rm ${DB_CONTAINER_NAME}


