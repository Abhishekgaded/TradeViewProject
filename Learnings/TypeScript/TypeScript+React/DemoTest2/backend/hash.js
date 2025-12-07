const bc = require("bcryptjs");


(async () => {
  console.log(await bc.hash("password@123", 10));
  console.log(await bc.hash("password124", 10));
})();
