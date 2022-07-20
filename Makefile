help:
	@echo "make build     Build the app."
	@echo "make clean     Clean the build artifacts."

build: clean 
	cd front && $(MAKE) build && touch build
	rm -rf server/public/*
	cp -av front/build/* server/public/
	cd server && $(MAKE) build && touch build

serve: build
	cd server && $(MAKE) serve

clean:
	cd front && $(MAKE) clean
	cd server && $(MAKE) clean
