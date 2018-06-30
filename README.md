# Elastic Stack Twitter Analyzer

Dockerized Elasticsearch project project that uses twitterbeat to retrieve and index tweets from a listed twitter handles. 

## Getting Started

Email me if you have any questions: pbindustriesapps@gmail.com

### Prerequisites

- Install Docker and Docker-compose (Docker CE is recommended)

### Installing

- Clone this project or download the zip from github
- Open the project in your terminal
- Create an .env file with your environment variables
- Run docker-compose.yml 

#### Example setup(using a Mac):
```
git clone https://github.com/pbindustries/elastic-stack-twitter-analyzer.git
cd elastic-stack-twitter-analyzer
vim .env
docker-compose build
docker-compose up
```
