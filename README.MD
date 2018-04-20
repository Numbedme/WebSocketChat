# WebSocket Chat Project

##Build:
  - mvn clean package

##Docker
  - docker build -t chat_image
  - docker run -p 8080:8080 --name chat_container chat_image
  
##Heroku:
  - heroku container:push web
  - appName =  warm-savannah-84407