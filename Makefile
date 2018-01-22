build:
	yarn run build

dev:
	yarn run dev

install: build
	scp -r src/*.html grey.ecyrd.com:/p/web/www-data/www.ecyrd.com/htdocs/evbingo/
	scp -r output/*.js grey.ecyrd.com:/p/web/www-data/www.ecyrd.com/htdocs/evbingo/output/
	scp -r src/args/*.html grey.ecyrd.com:/p/web/www-data/www.ecyrd.com/htdocs/evbingo/args/
	scp -r src/gfx/*.png grey.ecyrd.com:/p/web/www-data/www.ecyrd.com/htdocs/evbingo/gfx/

clean:
	rm -rf output/*
