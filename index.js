const express = require('express');
const path = require('path');
const port = 8008;
const app = express();

const db = require('./config/mongoose');
const Contact = require('./model/contacts');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use(express.urlencoded());
app.use(express.static('assets'));


var contactList=[
    {
        name:"nabeel",
        phone_num:9989
    },
    {
        name: "riya",
        phone_num:1123
    }
]

app.get('/', function(req,res){

    Contact.find({}, function(err, contacts){
        if(err){
            console.log('error in finding contacts');
            return;
        }
        return res.render('home', {
            title: "my first ejs server is running",
            contact_list: contacts

    });

    
    });
});

app.get('/practice', function(req,res){
    return res.render('practice', {
        title: "lets play together"
    });
});


app.post('/create-contact', function(req,res){
    // contactList.push(req.body);
    Contact.create({
        name:req.body.name,
        phone: req.body.phone_num
    } , function(err, newContact){
        if(err){
            console.log(err ,'error in creating contact');
            return;
        }
        console.log('*****', newContact);
        return res.redirect('back');
    });
     
});


app.get('/delete-contact', function(req,res){
    //let phone= req.query.phone_num;
    let id = req.query.id;
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting from db')
            return;
        }    
        
    });
    return res.redirect('back');
    // let contactIndex= contactList.findIndex(contact => contact.phone_num == phone) ;
    // if(contactIndex != -1){
    //     contactList.splice(contactIndex,1);
    // }
    
});
app.listen(port,function(err){
    if(err){
        console.log('error!', err);
        
    }
    console.log('yup! my express server is running on ' , port);

});