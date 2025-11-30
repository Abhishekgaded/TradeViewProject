const bc = require("bcryptjs");


(async () => {
  console.log(await bc.hash("password123", 10));
  console.log(await bc.hash("password124", 10));
})();
