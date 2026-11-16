# Load environment variables from .env file
ifneq (,$(wildcard .env))
    include .env
    export
endif

# Default values if .env is not present
TRAEFIK_DOCKER_NETWORK ?= proxy
TRAEFIK_GROUP ?= proxy
DOMAIN ?= allsurfaces-testing.development.computer
PORT ?= 4321

.PHONY: up down clean build rebuild respawn env config help

help:
	@echo "Available targets:"
	@echo "  up        - Start the Astro/Starlight server"
	@echo "  down      - Stop the Astro/Starlight server"
	@echo "  clean     - Clean up containers and images"
	@echo "  build     - Build the Astro/Starlight image"
	@echo "  rebuild   - Clean and build the Astro/Starlight image"
	@echo "  respawn   - Down, clean, build, and up the Astro/Starlight server"
	@echo "  env       - Create .env file from .env.example (alias: config)"
	@echo "  config    - Create .env file from .env.example"
	@echo "  help      - Show this help message"

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
