const getIdFromUrl = (url) => {
  const splitedUrl = url.split('/');

  return Number(splitedUrl[splitedUrl.length - 1]);
}

module.exports = {
  getIdFromUrl,
};
