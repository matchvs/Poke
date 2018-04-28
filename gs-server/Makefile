DOCKER_BUILD=./

build:


test:


image:
	sudo docker build -t $(IMAGE) $(DOCKER_BUILD)
	sudo docker tag $(IMAGE) $(HARBOR)/$(IMAGE)
	sudo docker push $(HARBOR)/$(IMAGE)
	sudo docker rmi $(IMAGE) $(HARBOR)/$(IMAGE)
