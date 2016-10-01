FROM node:5.0

# RUN groupadd -r app && useradd -r -g app app
ADD . /app  
WORKDIR /app  
RUN npm install  
EXPOSE 3000

CMD ["node", "index.js"]
