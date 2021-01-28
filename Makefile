ARGS = $(filter-out $@,$(MAKECMDGOALS))
MAKEFLAGS += --silent

ifndef APPLICATION_ENV
	include .env
endif

.DEFAULT_GOAL := help
.PHONY: help
help:
	@grep -E '^[a-zA-Z-]+:.*?## .*$$' Makefile | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "[32m%-17s[0m %s\n", $$1, $$2}'

up: ## Up Docker container
	docker-compose up --build -d

start: ## Start docker container
	docker-compose start

stop: ## Stop running docker container
	docker-compose stop

seeds: ## Run job seeds
	docker-compose exec sync npm run seeds-${ARGS}

exec: ## Connect to application container shell
	docker-compose exec ${ARGS}

root: ## Connect to application container shell as root user
	docker-compose exec --user root job /bin/bash

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
