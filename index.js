import http from 'http';
import fetch from 'node-fetch';
import fs from 'fs';


const server = http.createServer ((req, res) => {
    const url = req.url;
    let tableData = `<table border="1"><tr><th>NAME</th><th>HEIGHT</th><th>BIRTH YEAR</th><th>GENDER</th><th>URL</th></tr>`;


    if (url === '/') { 
        fs.readFile('hello.jpg', function(err, data) {   
            if (err) {
                throw err;
            }       
              res.write('<h1>Welcome to my Home Page</h1><img width="800px"src="data:image/jpeg;base64,');
              res.write(Buffer.from(data).toString('base64'));
              res.end(' "/>');
        })
    }

    else if (url === '/list') {
        fetch ('https://swapi.dev/api/people').then(res => res.json()).then(data => {
            createData(data);
            res.write(tableData);
            res.end();
        });  
    }

    else {
        res.write('Page not found');
        res.end();
    }


    function createData (data) {
        console.log(data);
        data.results.forEach(element => {
            tableData += `<tr><td>${element.name}</td><td>${element.height}</td><td>${element.birth_year}</td><td>${element.gender}</td><td>${element.url}</td></tr>`
        });
        tableData += `</table>`;
    }
}).listen (8090, () => console.log('listening on port ' + 8090))