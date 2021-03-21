FROM alpine:3.7

LABEL "com.predialize"="Predialize" \
       maintainer="Rodrigo Brabo <rodrigo@predialize.com.br>" \
       version="1.0" \
       description=""

ENV LANG=en_US.UTF-8 \
    LANGUAGE=en_US.UTF-8

ENV TIMEZONE UTC
ENV TZ=${TIMEZONE}

# Installing dependencies
RUN apk update && apk upgrade; \
    apk add --no-cache bash bash-completion tzdata mongodb su-exec; \
    sed -i -e "s/bin\/ash/bin\/bash/" /etc/passwd; \
    mkdir -p /data/db;

# Copy Scripts and set permissions
COPY ./start.sh /start.sh
COPY ./mongodb.sh /mongodb.sh
COPY ./run.sh /run.sh

RUN chmod +x /start.sh; \
    chmod +x /mongodb.sh; \
    chmod +x /run.sh;

VOLUME [ "/data/db" ]

EXPOSE 27017

CMD ["./run.sh"]
