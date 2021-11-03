import https from "https";

export default class HttpRequestBuilder {
  setUrl(url) {
    this.url = url;
    return this;
  }

  setQuery(query) {
    this.query = query;
    return this;
  }

  setMethod(method) {
    this.method = method;
    return this;
  }

  setData(data) {
    this.data = data;
    return this;
  }

  setHeaders(header, value) {
    if (this.headers === undefined) {
      this.headers = {};
    }

    if (typeof header === "object") {
      this.headers = {
        ...this.headers,
        ...header,
      };
      return this;
    }

    this.headers[header] = value;

    return this;
  }

  send() {
    return new Promise(
      function (resolve, reject) {
        const postData = JSON.stringify(this.data);
        if (this.method && this.method === "POST") {
          if (!postData) {
            return reject(new Error("Missing request body data !"));
          }
          this.headers["Content-Length"] = Buffer.byteLength(postData);
        }

        const request = https.request(
          {
            host: this.url,
            path: this.query || "",
            method: this.method,
            headers: this.headers || {},
          },
          (res) => {
            if (res.statusCode >= 400) {
              return reject(new Error(res.statusMessage));
            }

            let result = "";

            res.on("data", (chunk) => {
              result += chunk.toString();
            });

            res.on("end", () => {
              if (res.headers["content-type"] === "application/json") {
                return resolve(JSON.parse(result));
              }

              return resolve(result);
            });
          }
        );

        if (postData) {
          request.write(postData);
        }

        request.end();
      }.bind(this)
    );
  }
}
