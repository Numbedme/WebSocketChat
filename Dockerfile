FROM openjdk:alpine
VOLUME /tmp
ADD target/WebSocketChat.jar app.jar
CMD ["java", "-jar", "/app.jar"]