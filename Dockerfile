# Common build stage
FROM node:16.15.1-buster-slim as common-build-stage
RUN apt update && \
  apt install tzdata libaio1 unzip -y && \
  apt clean
ENV TZ="Asia/Bangkok"
RUN mkdir /opt/oracle
COPY ext-lib/instantclient-basic-linux.x64-19.15.0.0.0dbru-2.zip /opt/oracle/
RUN cd /opt/oracle && \
  unzip instantclient-basic-linux.x64-19.15.0.0.0dbru-2.zip && \
  rm -rf instantclient-basic-linux.x64-19.15.0.0.0dbru-2.zip
ENV PATH=$PATH:/opt/oracle/instantclient_19_15
ENV LD_LIBRARY_PATH=/opt/oracle/instantclient_19_15
WORKDIR /app
COPY --chown=node:node package.json package-lock.json ./
RUN npm install --force
RUN npm install cross-env -g
COPY --chown=node:node . .
RUN rm -rf ext-lib

# Production build stage
FROM common-build-stage
RUN npm run build
RUN npm prune --production --legacy-peer-deps
RUN chown -R node:node /app/dist && \
  rm -rf tsconfig.json \
  package.json package-lock.json 
USER node

ENV NODE_ENV production
ENV ORACLE_HOST=
ENV ORACLE_USERNAME=
ENV ORACLE_PASSWORD=
ENV ORACLE_SID=
ENV ORACLE_PORT=
ENV NODE_ENV=

EXPOSE 3000
CMD ["cross-env", "NODE_ENV=production", "node", "dist/main.js"]
