# Load environment variables from .env file
ifneq (,$(wildcard .env))
    include .env
    export
endif

# Default values if .env is not present
TRAEFIK_DOCKER_NETWORK ?= proxy
TRAEFIK_GROUP ?= proxy
DOMAIN ?= allsurfaces-testing.development.computer

.PHONY: up down clean build rebuild respawn env config

up:
	@echo "Starting Astro/Starlight server..."
	docker compose up -d

down:
	@echo "Stopping Astro/Starlight server..."
	docker compose down

clean:
	@echo "Cleaning up containers and images..."
	docker compose down --rmi local --volumes

build:
	@echo "Building Astro/Starlight image..."
	docker compose build

rebuild: clean build

respawn: down clean build up

env: config

config:
	@echo "Creating .env file from .env.example..."
	if [ ! -f .env ]; then \
		cp .env.example .env; \
		echo ".env file created."; \
	else \
		echo ".env file already exists."; \
	fi
