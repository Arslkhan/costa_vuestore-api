import { apiStatus } from '../../../lib/util'
import { Router } from 'express'
import axios from 'axios';

module.exports = ({ config }) => {
  const api = Router()

  api.post('/fetch-orderdetail', async (req, res) => {
    try {
      try {
        const orderDetails = req.body;
        console.log('orderDetails', orderDetails, config.magento2.api.url)
        const orderDetailResponse = await axios.post(
          config.extensions.orderDetails.orderData + 'rest/default/V1/w10/orderdata',
          orderDetails,
          {
            headers: {
              'Content-type': 'application/json'
            }
          }
        );
        console.log('orderDetailResponse', orderDetailResponse.data);
        apiStatus(res, orderDetailResponse.data);
      } catch (error) {
        console.error(error);
        apiStatus(
          res,
          'This Some Error Occurred while processing groutAdhsive',
          500
        );
      }
    } catch (error) {
      console.error(error);
      apiStatus(res, 'That Some Error Occurred while orderDetails', 500);
    }
  });
  /*api.post('/fetch-groutadhesiverecommendation', async (req, res) => {
    try {
      try {
        const groutadhsiveDetails = req.body;
        const groutAdhsiveResponse = await axios.post(
          config.extensions.groutadhesive.endpoint + 'rest/V1/addrecommendations',
          groutadhsiveDetails,
          {
            headers: {
              'Content-type': 'application/json'
            }
          }
        );
        apiStatus(res, groutAdhsiveResponse.data);
      } catch (error) {
        console.error(error);
        apiStatus(
          res,
          'This Some Error Occurred while processing groutAdhsive',
          500
        );
      }
    } catch (error) {
      console.error(error);
      apiStatus(res, 'That Some Error Occurred while groutAdhsive', 500);
    }
  });
  api.post('/fetch-groutadhesivegetrecommendation', async (req, res) => {
    try {
      try {
        const groutadhsiveDetails = req.body;
        const groutAdhsiveResponse = await axios.post(
          config.extensions.groutadhesive.endpoint + 'rest/V1/getrecommendations',
          groutadhsiveDetails,
          {
            headers: {
              'Content-type': 'application/json'
            }
          }
        );
        apiStatus(res, groutAdhsiveResponse.data);
      } catch (error) {
        console.error(error);
        apiStatus(
          res,
          'This Some Error Occurred while processing groutAdhsive',
          500
        );
      }
    } catch (error) {
      console.error(error);
      apiStatus(res, 'That Some Error Occurred while groutAdhsive', 500);
    }
  });*/
  return api;
}
