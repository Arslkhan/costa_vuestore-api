import { apiStatus } from '../../../lib/util'
import { Router } from 'express'
import axios from 'axios';

module.exports = ({ config }) => {
  const api = Router()
  console.log('emailDetails api', api)
  api.post('/sendEmail', async (req, res) => {
    try {
      try {
        const emailDetails = req.body;
        console.log('emailDetails', emailDetails, config.extensions.contactEmail.endpoint)
        const emailResponse = await axios.post(
          config.extensions.contactEmail.endpoint + '/rest/default/V1/w10/contactus',
          emailDetails,
          {
            headers: {
              'Content-type': 'application/json'
            }
          }
        );
        console.log('emailResponse', emailResponse);
        apiStatus(res, emailResponse.data);
      } catch (error) {
        console.error(error);
        apiStatus(
          res,
          'This Some Error Occurred while processing contact us email',
          500
        );
      }
    } catch (error) {
      console.error(error);
      apiStatus(res, 'That Some Error Occurred while sending contact us email', 500);
    }
  });
  return api;
}
