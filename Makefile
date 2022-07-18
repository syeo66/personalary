help:
	@echo "make build     Build the app."
	@echo "make clean     Clean the build artifacts."

build: 
	cd front && $(MAKE) build && touch build
	rm -rf server/public/*
	cp -av front/build/* server/public/

clean:
	cd front && $(MAKE) clean
	