# --build-arg 
ARG image
ARG dbname 
ARG port
ARG password
ARG user 

# source, expected postgres alpine
FROM $image

# set env vars
ENV POSTGRES_USER=$user
ENV PG_USER=$user
ENV POSTGRES_PASSWORD=$password
ENV PG_PASSWORD=$password
ENV dbname=$dbname


EXPOSE $port 
# escape=`
COPY postgres.sql docker-entrypoint-initdb.d

# actually start the db listening
CMD ["postgres"]
