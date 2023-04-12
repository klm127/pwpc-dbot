# (private) .env definitions include DB_USER, DB_PASSWORD
include .env

# --- Docker creation and starting.

# combo command; create and run the container, then create the database
pg:
	$(MAKE) pg.container
	timeout /T 3
	$(MAKE) pg.db

# build image
pg.container:
	docker run --name ${PG_CONTAINER} \
	-p ${PG_PORT_EXPOSE}:${PG_PORT_INTERNAL} \
	-e POSTGRES_USER=${PG_USER} \
	-e POSTGRES_PASSWORD=${PG_PASS} \
	-d ${PG_IMAGE}

# stop the running container
pg.stop:
	docker stop ${PG_CONTAINER}

# start the built, but stopped container
pg.start:
	docker start ${PG_CONTAINER}

# remove the container
pg.rm:
	docker rm ${PG_CONTAINER} --force

# create the database in the postgres container 
pg.db:
	docker exec -it ${PG_CONTAINER} createdb --username=${PG_USER} --owner=${PG_USER} ${PG_DB}

# access postgres shell (allows running of arbitrary sql commands from terminal)
psql:
	docker exec -it ${PG_CONTAINER} psql -U ${PG_USER} ${PG_DB}

