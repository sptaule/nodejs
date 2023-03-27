const bcrypt = require("bcrypt");
(async () => {
    let pw = await bcrypt.hash("123456789", 10);
    console.log(pw);
})();