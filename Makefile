# (private) .env definitions include DB_USER, DB_PASSWORD
include .env

# --- Docker creation and starting.

# build image

pg.container:
	docker run --name ${PG_CONTAINER} \
	-p ${PG_PORT_EXPOSE}:${PG_PORT_INTERNAL} \
	-e POSTGRES_USER=${PG_USER} \
	-e POSTGRES_PASSWORD=${PG_PASS} \
	-d ${PG_IMAGE}

pg.stop:
	docker stop ${PG_CONTAINER}

pg.rm:
	docker rm ${PG_CONTAINER} --force

pg.db:
	docker exec -it ${PG_CONTAINER} createdb --username=${PG_USER} --owner=${PG_USER} ${PG_DB}

pg:
	$(MAKE) pg.container
	timeout /T 3
	$(MAKE) pg.db
