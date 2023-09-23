help:
	@echo "make build     Build the app."
	@echo "make clean     Clean the build artifacts."
	@echo "make dev       Start the server for development."

build: build/index.js

build/index.js: node_modules
	npm run build
	touch build

clean:
	rm -rf build/*

serve: build
	npm run serve

start: node_modules
	npm run dev

node_modules : package-lock.json package.json
	npm install
	touch node_modules
