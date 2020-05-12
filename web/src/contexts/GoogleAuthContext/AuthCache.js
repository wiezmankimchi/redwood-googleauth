// Adapted from https://github.com/auth0/auth0-spa-js/blob/master/src/cache.ts

const keyPrefix = '@@redwoodGoogleAuth@@';

const createKey = () => {
  return `${keyPrefix}::${process.env.REDWOOD_ENV_GOOGLE_API_CLIENT_ID}`;
};
export class AuthCache {
  saveUser(entry) {
    const cacheKey = createKey();
    window.localStorage.setItem(cacheKey, JSON.stringify(entry));
  }
  getUser() {
    const cacheKey = createKey();
    const json = window.localStorage.getItem(cacheKey);
    return JSON.parse(json);
  }
  clearUser() {
    Object.keys(window.localStorage).map((key) => {
      if (key.startsWith(keyPrefix)) {
        window.localStorage.removeItem(key);
      }
    });
  }
}
