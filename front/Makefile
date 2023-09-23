help:
	@echo "make build     Build the app."
	@echo "make start     Start the app for development."
	@echo "make clean     Clean the build artifacts."
	@echo "make test      Run tests."

SRCFILES=$(shell find src -type f)

build: node_modules $(SRCFILES)
	npm run build
	touch build

start: node_modules
	PORT=8001 npm run start

clean: node_modules
	rm -rf build

distclean: clean
	rm -rf node_modules

test: node_modules
	npm run test

######################################################################

node_modules : package-lock.json package.json
	npm install
	touch node_modules
