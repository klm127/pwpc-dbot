# comment
ARG image
ARG dbname
ARG port
ARG user
ARG password

FROM ${image}

COPY postgres.sq/schema.sql schema.sql

RUN echo "YES!"





