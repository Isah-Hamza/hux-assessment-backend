const express = require('express');
const users = require('../data/dummyUsers');
const router = express.Router();

router.get('/get', (req, res) => {
    res.json(users);
})

router.route('/')
    .get((req, res) => {
        res.json(users);
    })
    .post((req, res) => {
        const email = req.body.email;
        const password = req.body.password;

        const new_user = {
            id:users.length + 1,
            email,
            password,
            contacts: [],
        }

        users.push(new_user);
        console.log(users)

        res.json({
            message:'User created successfully',
            status: true,
        })
    })

    router.route('/:user_id/contacts')
    .get((req, res) => {
        const user_id = req.params.user_id;
        const user = users.find(user => user.id == user_id)
        if(user)
            res.json({ 
                message: 'contacts fetched successfully', 
                user
            });
        else{
            res.sendStatus(400).send('No such user found')
        }
    })
    .post((req, res) => {
        const user_id = req.params.user_id;
        const user = users.find(user => user.id == user_id);
        if(!user) res.sendStatus(400).send('No such user found');

        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const phone_number = req.body.phone_number;

        const new_contact = {
            id : user.contacts.length + 1,
            first_name, 
            last_name, 
            phone_number,
        }

        user.contacts.push(new_contact);
        res.json({
            message: 'contact saved successfully', 
            user
        });
    })

    router.route('/:user_id/contacts/:contact_id')
    .get((req, res) => {
        const user_id = req.params.user_id;
        const contact_id = req.params.contact_id;
        const user = users.find(user => user.id == user_id);
        if(!user) res.sendStatus(400).send('No such user found');
        
        const contact = user.contacts.find(contact => contact.id == contact_id);
        if(!contact) res.sendStatus(400).send('No such contact found');

        res.json({ 
            message: 'contact fetched successfully', 
            contact
        });
        
    })
    .put((req, res) => {
        const user_id = req.params.user_id;
        const contact_id = req.params.contact_id;
        const user = users.find(user => user.id == user_id);
        if(!user) res.sendStatus(400).send('No such user found');
        
        const contact = user.contacts.find(contact => contact.id == contact_id);
        if(!contact) res.sendStatus(400).send('No such contact found');

        contact.first_name = req.body.first_name || contact.first_name;
        contact.last_name = req.body.last_name || contact.last_name;
        contact.phone_number = req.body.phone_number || contact.phone_number;

        res.json({ 
            message: 'contact updated successfully', 
            contact
        });
        
    })
    .delete((req, res) => {
        const user_id = req.params.user_id;
        const contact_id = req.params.contact_id;
        const user = users.find(user => user.id == user_id);
        if(!user) res.sendStatus(400).send('No such user found');
        
        const contact = user.contacts.find(contact => contact.id == contact_id);
        if(!contact) res.sendStatus(400).send('No such contact found');

        const result = user.contacts.filter(contact => {
            const stringified = String(contact.id);
            return stringified !== contact_id
        });
        user.contacts = result;

        res.json({ 
            message: 'contact deleted successfully', 
            user, 
        });
        
    })


module.exports = router