help:
	@echo "make build     Build the app."
	@echo "make clean     Clean the build artifacts."
	@echo "make dev       Start the server for development."

build: build/index.js

build/index.js:
	yarn build
	touch build

clean:
	rm -rf build/*

start:
	yarn dev

