import { apiStatus } from '../../../lib/util'
import { Router } from 'express'
// import EmailCheck from 'email-check'
import jwt from 'jwt-simple'
// import NodeMailer from 'nodemailer'
import axios from 'axios';

module.exports = ({ config }) => {
  const msApi = Router()
  let token

  /**
   * GET send token to authorize email
   */
  msApi.get('/get-token', (req, res) => {
    token = jwt.encode(Date.now(), config.extensions.mailService.secretString)
    apiStatus(res, token, 200)
  })

  /**
   * POST send an email
   */
  msApi.post('/send-email', (req, res) => {
    try {
      try {
        const emailDetails = req.body;
        const emailResponse = axios.post(
          'https://secure.w10.world/rest/default/V1/w10/contactus',
          emailDetails,
          {
            headers: {
              'Content-type': 'application/json'
            }
          }
        );
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
  })

  return msApi
}
