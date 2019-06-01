const generateRandomNums = (max, min) =>
  Math.random() * (max - min) + min;

const mockApi = (
  args,
  delay = generateRandomNums(500, 700),
  resp = { status: 'ok' }
) =>
  new Promise((resolve, reject) =>
    setTimeout(() => resolve(resp), delay)
  );

const api = {
  remove: mockApi,
};

export default api;
