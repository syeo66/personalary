help:
	@echo "make build     Build the app."
	@echo "make clean     Clean the build artifacts."
	@echo "make dev       Start the server for development."

build: build/index.js

build/index.js: node_modules
	yarn build
	touch build

clean:
	rm -rf build/*

serve: build
	yarn serve

start: node_modules
	yarn dev

node_modules : yarn.lock package.json
	yarn
