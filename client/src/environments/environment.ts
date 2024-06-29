// src/environments/environment.ts
export const environment = {
  appName: "bedoer",
  production: false,
  HOST: "http://127.0.0.1:5001/",
  getUrl() {
    return `${this.HOST}`;
  },
};
