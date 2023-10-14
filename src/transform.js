module.exports = {
  replaceBaseUrl,
};

function replaceBaseUrl(base) {
  return (manifest) => ({
    ...manifest,
    urls: { ...manifest.urls, base },
  });
}
