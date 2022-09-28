const fetch =  require("cross-fetch");

// const address = {
//     tn: {
//         name: 'Tamil Nadu, India',
//         lat: '12.92038576',
//         long: 79.15004187
//     },
//     tel: {
//         name: 'Telangana, India',
//         lat: 17.123184,
//         long: 79.208824
//     },
//     hr: {
//         name: 'Haryana, India',
//         lat: 29.238478,
//         long: 76.431885
//     },
//     mp: {
//         name: 'Madhya Pradesh, India',
//         lat: 23.473324,
//         long: 77.947998
//     },
//     del: {
//         name: 'Delhi, India',
//         lat: '28.6699929',
//         long: '77.23000403'
//     },

// }


// const geocode = (info, callback) => {

//     if(info == undefined){
        
//         console.log('Wrong location');
//     }
//     else{
//         callback({ 
//             location: info.name,
//             latitude: info.lat,
//             longitude: info.long
//            })
//     }       
//     }

// module.exports ={
//     geocode: geocode,
//     address: address
// }

var myHeaders= {
    'Content-Type': 'text/xml',
    'apikey' : "UirR2iFdlANNjoATyUnmi7e7dVCse0Ng"
}

var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};

const fetchData = async (address,callback) => {
    let response = await fetch("https://api.apilayer.com/geo/city/name/"+ address, requestOptions);
    let data = await response.json();
    data = JSON.stringify(data);
    data = JSON.parse(data);
   // console.log("location: ", data);
  if(data.message)
  {
    callback('location not found. Please try different address')
  }
  else{
   callback(undefined, {
    location: data[0].name,
    lat: data[0].latitude,
    long: data[0].longitude
  })}
}
   
module.exports = {fetchData}





 