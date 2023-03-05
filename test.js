const {Payriff} = require("./lib/index")






const payriff = new Payriff(
    "ES1091104",
    "D28E25222ACE4B4984307DC9C521CABF",
    "",
    "",
    ""
)

payriff.createOrder(1,"AZN","EN").then(console.log).catch(console.log)