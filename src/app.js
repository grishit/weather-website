const path = require('path')                           // path is in-built module in node no need to install npm module
const express = require('express')                  // express library is imported
const hbs = require('hbs')
const {fetchData} = require('./utils/geocode.js')
const {forecast} = require('./utils/forecast.js')
const port = process.env.PORT || 3000


const app = express()                               // creating app variable using express function 

// app is suppose to be company name with website app.com
// if we need to access different web pages of app.com such as 'app.com/home, app.com/about, app.com/event' we use app.get()
// app.get is used to get url from web server. it takes to 2 argument first is string which should be home, about or event according to the needs and second is function which sends back response from the page
//function contains 2 argument first is request which server made and second is response which webpage send


// setting up paths for express
const pathForPublicDir = path.join(__dirname, '../public')              // setting path of public directory using path.join
const viewPath = path.join(__dirname, '../templates/views')                   // setting path of view directory for hbs
const partialsPath = path.join(__dirname, '../templates/partials') 

// setup static directory
app.use(express.static(pathForPublicDir))       // this is used to setting up directory for html pages

// setup handlebars and views location
app.set('view engine', 'hbs')                   // used to integrate handlebars in js file and set it to default 'views' directory
app.set('views', viewPath)                      // used to customise point views to customized views directory
hbs.registerPartials(partialsPath)              // used to setup path for partials


// app.get('', (req, res) => {
    
//     res.send('<h1>hello express</h1>')                              // res.send is used to send response back in this case it is simple text

// })



// methods to get urls
app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'Conan'
    })
})

app.get('/weather', (req, res) => {
    
    if(!req.query.address)
        return res.send({
            error: 'please provide address!'
        })
    else{
        fetchData(req.query.address, (error,{location, lat, long} = {   }) => {
            if(error){
                return res.send({
                    error: 'error', error
                })
            }
            forecast(lat, long, (error, {description, temperature}) => {
                if(error)
                    return res.send({error: 'error: ', error})
                else{
                    res.send({

                        location: location,
                        description: description,
                        temperature: temperature,
                    })
                }
            })
        })
    }    
})

app.get('/product', (req, res) => {
        if(!req.query.search)
            return res.send({
                error: 'you must provide a search term'
            })
        
            console.log(req.query.search);
            res.send({
                products: []
            })

})

app.get('/about', (req, res) => {
    
    res.render('about', {
        name: 'Conan',
        title: 'About me'
    })                                     

})

app.get('/help', (req, res) => {
    
    res.render('help', {
        title: 'help',
        msg: 'help msg',
        name: 'Conan'
    })                      
})

app.get('/help/*', (rq, res) => {
    res.render('404', {
        title: '404 help',
        name: 'Rishit',
        errorpage: 'Help article not found'
    })
})
app.get('*', (req,res) => {                              // it is used to setup error page it needs to come last
    res.render('404', {
        title: '404',
        name: 'Rishit',
        errorpage: 'Page not found'
    }) 
})



app.listen(port, () => {                                // app.listen is imoportant as it helps in opening server using specific port
                                                         // port 3000 is default develpor port which is used locally
    console.log("server started on port ", port);


})                                               
                                                                   




// response methods

// res.status()    mostly used for showing error
// res.send() we can use it with status to check what kind of error we getting
//res.json() is used to send json file 
//res.download()is used to send download request. give path of file inside brackets
