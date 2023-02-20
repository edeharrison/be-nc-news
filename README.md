# Northcoders News API

## Background

This is an API for the purpose of accessing application data programmatically. It mimics the structure of a real world backend service (such as reddit) which would then provide this information to the front end architecture.

The database is PSQL.

## Setup

If you wish to clone this repo and work on it locally, you will need to setup two environment variables, populated with the following code:

1) .env.development

```
PGDATABASE=nc_news
```

2) .env.test

```
PGDATABASE=nc_news_test
```

They should both be stored in the root directory.
