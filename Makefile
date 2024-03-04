up:
	docker-compose -f ./docker/docker-compose.yaml up -d --build


down:
	docker-compose -f ./docker/docker-compose.yaml down
	docker container prune
	docker image prune -a