# Install NPM Packages for all services 
install-npm:
	./scripts/packages.sh

# Start all services
start-services:
	docker-compose up --build app_local