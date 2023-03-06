# Payriff

Payriff paymen system unofficial sdk for javascript / typescript.

For official doc : https://docs.payriff.com/# 

## Installation


```bash
npm install payriff
```

## Usage

```javascript
const {Payriff} = require("payriff")


const payriff = new Payriff(
    "yourMerchant",
    "yourSecret",
    "approvalWebHookUrl",
    "cancelWebHookUrl",
    "declineWebHookUrl",
)

payriff.createOrder(100,"AZN","EN")
.then(response =>{
    console.log(response)
})

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)