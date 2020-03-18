module.exports = {
  timeout: 5000,
  'check-leaks': true,
  exclude: ['test/mock-data/*', 'test/load-test/*'],
  recursive: true,
  exit: true,
};
