const mysql=require('mysql2');
const express=require('express');
var app=express();
const path=require('path');
const http=require('http');
const parser=require('body-parser');
const { connect } = require('http2');
const server=http.createServer(app);
app.use(parser.json());
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Vaishu@2000',
    database:'CUCS',

})
connection.connect((err)=>
{
    if(!err) 
    console.log('Database connected');
    else
    console.log('Error');
})
app.listen(7000,()=>console.log('server listening at 7000'));

app.use(parser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,'/')));

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'/admin.html'));
});

app.get('/display',(req,res)=>
{
    connection.query('SELECT * FROM Blossoms',(err,rows,fields)=>
    {
        if(!err)
        res.send(rows);
        else
        console.log("error");
    })
})

app.post('/add',(req,res)=>
{
    var post={
        S_Regno:req.body.sid,
        S_Name:req.body.sname,
        S_Class:req.body.sclass,
        S_Event:req.body.sevent,
        S_Team:req.body.steam
    };
    var sql='INSERT INTO Blossoms SET ?';
    var query=connection.query(sql,post,(err,result)=>
    {
        if (err) throw err;
        res.send("Inserted Rows Successfully");
    })
});


// app.get('/delete',(req,res)=>
// {
//     S_Regno=req.body.sudid
//     var sql=`DELETE FROM Blossoms WHERE S_Regno='${sid}'`;
//     var query=connection.query(sql,(err,result)=>
//     {
//         if(err) throw err;
//         res.send("Deleted the Rows")
//     });
// });
app.get('/delete/:id',(req,res)=>
{
    var sql=`DELETE FROM Blossoms WHERE S_Regno=${req.params.id}`;
    var query=connection.query(sql,(err,result)=>
    {
        if(err) throw err;
        res.send("Deleted the Rows")
    });
});

app.get('/update/:id',(req,res)=>
{
    var event='Singing'
    var sql=`UPDATE Blossoms SET S_event='${event}' WHERE S_Team=${req.params.id}`;
    var query=connection.query(sql,(err,result)=>
    {
        if(err) throw err;
        res.send("Updated the Rows")
    });
});

// app.post('/update',(req,res)=>{
//     S_Event=req.body.eventid,
//     S_Team=req.body.teamname
//     sql=`UPDATE Blossoms SET S_event = '${sevent}' WHERE S_team= '${steam}'`;
//     var query=connection.query(sql,post,(err,result)=>
//     {
//         if (err) throw err;
//         res.send("Updated Successfully");
        
//     })        
// })
app.post('/edisplay',(req,res)=>
{
    connection.query('SELECT * FROM Blossoms WHERE S_Event=?',[req.body.eventid],(err,rows,fields)=>
    {
        if(!err)
        res.send(rows);
        else
        console.log("error");
    })
})

app.post('/sinfodisplay',(req,res)=>
{    
    connection.query('SELECT S_Regno,S_Name FROM Blossoms WHERE S_Team= ?',[req.body.teamname],(err,rows,fields)=>
    {
        if(!err)
        res.send(rows);
        else
        console.log("error");
    })
})


