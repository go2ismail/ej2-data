# Changelog

## [Unreleased]

## 15.4.20-preview (2017-12-01)

## 15.4.17-preview (2017-11-13)

### DataManager

DataManager communicates with data source and returns the desired result based on the Query provided.

- **Query** – DataManager have APIs for generating JavaScript data query with ease.
- **CRUD in individual requests and Batch** – CRUD operations are fully supported.
 The options are enabled to commit the data as a single or multiple requests.
- **Adaptors** – Adaptors are specific dataSource type interfaces that are used by
  DataManager to communicate with DataSource.
  DataManager have three in-built adaptors. They are, ODataAdaptor, JsonAdaptor and UrlAdaptor.
- Calculates and maintains aggregates, sorting order and paging.
