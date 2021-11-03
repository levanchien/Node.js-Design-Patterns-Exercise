import HttpRequestBuilder from "./request-builder.mjs";

new HttpRequestBuilder()
  .setUrl("jsonplaceholder.typicode.com")
  .setMethod("GET")
  .setQuery("/photos/100")
  .send()
  .then(
    (t) => console.log(t),
    (e) => console.log(e)
  );

new HttpRequestBuilder()
  .setUrl("jsonplaceholder.typicode.com")
  .setMethod("POST")
  .setQuery("/photos")
  .setHeaders({
    Authorization: "Bearer ACCESS-TOKEN",
    "Content-Type": "application/json",
    Accept: "application/json",
  })
  .setData({
    albumId: 10,
    title: "This is testing",
    url: "https://via.placeholder.com/600/92c952",
    thumbnailUrl: "https://via.placeholder.com/150/92c952",
  })
  .send()
  .then(
    (t) => console.log(t),
    (e) => console.log(e)
  );
