const sendRequest = async (
  url,
  method = 'GET',
  body,
  header = {
    'Content-Type': 'application/json',
  },
) => {
  /* eslint-disable */
  const response = await fetch(url, {
    /* eslint-enable */
    method,
    headers: header,
    body: JSON.stringify(body),
  });

  return response.json();
};

export default sendRequest;
