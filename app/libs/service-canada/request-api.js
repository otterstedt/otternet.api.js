const requestAPI = require('../http/request-api');
var formurlencoded = require('form-urlencoded');

const curl = require( 'curl-request' );

module.exports.getPrApplicationDecisionStatusPage = (uic, surname, birthDate, birthCountryId) => {

    let url = "https://services3.cic.gc.ca/ecas/authenticate.do"

    let headers = {
    };

    headers['Content-Type'] = "application/x-www-form-urlencoded";

    let body = "lang=&identifierType=1&identifier=" + uic + "&surname=" + surname + "&dateOfBirth=" + birthDate + "&countryOfBirth=" + birthCountryId;

    let bodyForm = { 
        lang: '',
        identifierType: 1,
        identifier: uic,
        surname: surname,
        dateOfBirth: birthDate,
        countryOfBirth: birthCountryId
}

    body = formurlencoded(bodyForm);

    let myCurl = new curl();

    return myCurl.setHeaders(['Content-Type: application/x-www-form-urlencoded'])
        .setBody(body)
        .post(url)
        .then((response) => {


            if(response.statusCode === 302 && response.headers.location.includes('viewcasestatus')) {
                let newCurl = new curl();


                return newCurl
                    .setHeaders(['Cookie: ' + response.headers['set-cookie'][0]])
                    .get(response.headers.location)
                    .then((response) => {
                        return response
                    })
            }
            else {
                throw('Unable to find an application based on the provided information');
            }
        })
        .then(response => {
            
            return response.body;
        });



    //let body = formurlencoded(bodyForm);

    //let body = "lang=1";
/*
    console.log(body);

    return requestAPI.makeHttpRequest(url, 'POST', headers, body, 200)
        .then(response => {

            console.log(response.caseless)

            return response.body;
        });
*/
}