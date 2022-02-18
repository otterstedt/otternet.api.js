const serviceCanada = require('../../libs/service-canada/request-api');

module.exports.getPrApplicationStatus = (uic, surname, birthDate, birthCountryId) => {

    return serviceCanada.getPrApplicationDecisionStatusPage(uic, surname, birthDate, birthCountryId)
        .then(page => {
            

            let status =  [
                {   status: 'Decided',
                    state: page.includes('Decision Made')
                },
                {
                    status: 'Processing',
                    state: page.includes('In Process')
                },
                {   status: 'Completed',
                    state: page.includes('Complete')
                }
            ]
            
            status = status.filter(x => {
                return x.state;
            })

            return {
                status: (status.length > 0 ? status[0].status : 'N/A')
            };


        })
        .catch(error => {
            throw(error);
        });

};