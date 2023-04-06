const app = require('./app.js');

// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    

    await mongoose.connect('mongodb+srv://michaelyuyue2012:nU2CvX5WlRgMI1Il@cluster0.wvnpat0.mongodb.net/?retryWrites=true&w=majority')
    
    // await mongoose.connect('mongodb://127.0.0.1:27017/test');
    
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    app.listen(5000, () => {
        console.log('Server is running on port 5000');
    });
}