ARGS = $(filter-out $@,$(MAKECMDGOALS))
MAKEFLAGS += --silent

ifndef APPLICATION_ENV
	include .env
endif

.DEFAULT_GOAL := help
.PHONY: help
help:
	@grep -E '^[a-zA-Z-]+:.*?## .*$$' Makefile | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "[32m%-17s[0m %s\n", $$1, $$2}'

bundle:
	mkdir -p git-bundle
	cp -r mongodb git-bundle	
	cp .env git-bundle
	cp docker-compose.production.yml git-bundle && mv git-bundle/docker-compose.production.yml git-bundle/docker-compose.yml
	cp -r metabase.db git-bundle
	cp -r sync git-bundle
	rm -rf git-bundle/sync/node_modules

up: ## Up Docker container
	docker-compose up --build -d

start: ## Start docker container
	docker-compose start

stop: ## Stop running docker container
	docker-compose stop

seeds: ## Run gitlab_sync seeds
	docker-compose exec gitlab_sync npm run seeds-dev

exec: ## Connect to application container shell
	docker-compose exec ${ARGS}

root: ## Connect to application container shell as root user
	docker-compose exec --user root gitlab_sync /bin/bash

restart: ## Starts a log server that displays logs in real time
	docker-compose restart ${ARGS}

logs: ## Starts a log server that displays logs in real time
	docker-compose logs --tail=100 --follow ${ARGS}
###< Docker machine states ###

#############################
# Argument fix workaround
#############################
%:
@:
