function isHttp(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  if (url.protocol === "http:") {
    return string[5] === "/" && string[5] === "/";
  } else if (url.protocol === "https:") {
    return string[6] === "/" && string[7] === "/";
  } else {
    return false;
  }
}

module.exports = isHttp;
