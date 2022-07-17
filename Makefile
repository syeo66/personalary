
help:
	@echo "make build     Build the app."
	@echo "make start     Start the app for development."
	@echo "make test      Run tests."

SRCFILES=$(shell find pages components -type f)

build: node_modules $(SRCFILES)
	yarn build
	touch .next/static
	touch .next/server

start: node_modules
	yarn start

test: node_modules
	yarn test

######################################################################

node_modules : yarn.lock package.json
	yarn install
	touch node_modules
