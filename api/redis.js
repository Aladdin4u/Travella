const Redis = require("redis");
const redisClient = Redis.createClient()
console.log("connected to redis")
redisClient.on("error", (err) => console.log("error", err))
redisClient.connect()

// key *
// redisClient.disconnect((err) => console.log(err));
async function send() {
    // await redisClient.set("name", "john");
    const name = await redisClient.get("name");
    console.log(name)
    // let keys = redisClient.keys("*")
    // console.log(keys)
    setTimeout(async () => {
        await redisClient.disconnect()
    },5000)
}
send()
console.log("exit redis")
