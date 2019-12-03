aws ecr get-login --no-include-email --region us-west-2 | /bin/bash
docker build -t webapp-backend-stg .
docker tag webapp-backend-stg:latest 616937467218.dkr.ecr.us-west-2.amazonaws.com/webapp-backend-stg:latest
docker push 616937467218.dkr.ecr.us-west-2.amazonaws.com/webapp-backend-stg:latest