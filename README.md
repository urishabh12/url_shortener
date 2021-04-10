# URL Shortener

## How to run (Follow the sequence)

### Database Setup

```
docker pull postgres
docker run -e POSTGRES_PASSWORD=password -d -p 5432:5432 postgres
docker ps (copy the container id)
docker exec -it <container_id> bash
psql -U postgres
create database url_shortener;
\c url_shortener
create table url(id char(6) primary key, url text, used boolean, time timestamp);
create index url_idx on url (id) include (url);
insert into url(id, url, used, time) values('AAAAAA','https://www.google.com', '1', to_timestamp(1616932713));
```

### Run all the applications

**Follow the app sequence** <br >

- unique_code_generator
- unique_code_distributor
- url_redirector

```
node index.js
```

## Test Examples

### Run in browser

```
localhost:6002/AAAAAA
```

### Generating shorter url

- **URL**

```
localhost:6001/api/unique_code/create
```

- **Method** <br>
  `POST`
- **Data**

```
{
    "url": "http://www.facebook.com"
}
```

- **Response**

```
{
    code: "<code>"
}
```

## Detailed Architecture and Explanation (Todo)

## Todo

- [ ] Add Message Queue Logic
- [ ] LRU Cache
- [ ] Add Sharding Logic (Multiple database nodes and consistent hashing)
