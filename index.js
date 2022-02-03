const express=require('express');
const path=require('path');
const port=8000;

const db=require('./config/mongoose');
const Contact=require('./models/contact');

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded()); 
app.use(express.static('assets'));

//  middlewear1
// app.use(function(req,res,next){
//     console.log('middlewear 1 called');
//     next();
// });

//  middlewear2
// app.use(function(req,res,next){
//     console.log('middlewear 2 is called');
//     next();
// });

var contactList = [
    {
        name:"Gurleen",
        phone:"1111111111"
    },
    {
        name:"Tony Stark",
        phone:"1234567890"
    },
    {
        name:"Spidey",
        phone:"2468008642"
    }
]


app.get('/',function(req,res){
    // res.send('<h1>Cool,it is running! or is it?<h1>');

    Contact.find({},function(err,contacts){
           if(err){
               console.log('Error in fetching contacts from db');
               return;
           }
      return res.render('home',{
        title:"Contacts List",
        contact_list:contacts
           
    });
    // return res.render('home',{
    //     title:"Contacts List",
    //     contact_list:contactList
    // });
});
});

app.get('/practice',function(req,res){
    return res.render('practice',{
       title:"Let us play with ejs"
    });
});

app.post('/create-contact',function(req,res){
    // contactList.push({
    //    name:req.body.name,
    //    phone:req.body.phone
    // });
    // contactList.push(req.body);
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
        console.log('Error in creating a contact!');
        return;
    }

        console.log('*******',newContact);
        return res.redirect('back');
    });
   // return res.redirect('/');
    // return res.redirect('back');
});
// for deleting a contact
app.get('/delete-contact',function(req,res){
   //get the id from query in the url
   let id=req.query.id;
   // find the contact in the database using id and delete it
   Contact.findByIdAndDelete(id,function(err){
           if(err){
               console.log('Error in deleting an object from database');
           }

           return res.redirect('back');
   });
//    // get the query from the url
//     let phone=req.query.phone;

//     let contactIndex=contactList.findIndex(contact => contact.phone==phone);
     
//     if(contactIndex!= -1){
//         contactList.splice(contactIndex,1);
//     }
//     return res.redirect('back');
});

app.listen(port,function(err){
    if(err)
    {
        console.log("Error in running the server ",err);
    }
    console.log("Yup!My Express Server is running on Port: ",port);
});