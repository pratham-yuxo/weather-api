const port = 80;
const http = require("http");
const fs = require("fs");
const requests = require("requests");

const file = fs.readFileSync("./static/static.html", "utf-8")

const replaceval=(temp,org)=>{
    let temperature=temp.replace("{%temp%}",(org.main.temp-273.5).toFixed(2));
    temperature=temperature.replace("{%tempmn%}",(org.main.temp_min-273.5).toFixed(2));
    temperature=temperature.replace("{%tempmx%}",(org.main.temp_max-273.5).toFixed(2));
    temperature=temperature.replace("{%city%}",org.name);
    temperature=temperature.replace("{%country%}",org.sys.country);
    temperature=temperature.replace("{%tempstatus%}",org.weather[0].main);
    return temperature;
}

let urCity="Jalandhar";
// console.log(file);
const server = http.createServer((req, res) => {
    if (req.url="/") {
        res.send
    }
    if (req.url = "/") {
        // urCity=fs.urCity;
        requests(`https://api.openweathermap.org/data/2.5/weather?q=${urCity}&appid=3cadef4ff3db88702c89f568e88a4559`)
            .on('data',  (chunk)=> {
                //we got our json data in chunk
                //converting json into js object
                const objdata=JSON.parse(chunk);
                //converting js object into an array
                const arr=[objdata];
                //now we got an array of an object
                const datamap=arr.map((val)=> replaceval(file,val)).join("");
                res.write(datamap);
                // console.log(datamap);
            })
            .on('end', (err)=> {
                if (err) return console.log('connection closed due to errors', err);
                res.end();
                console.log('end');
            });
    }
}) 
server.listen(port,"127.0.0.1");