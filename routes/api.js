'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.route('/api/convert')
    .get((req, res) => {
      const input = req.query.input;
      const initNum = convertHandler.getNum(input);
      const initUnit = convertHandler.getUnit(input);

      if (initNum === 'Invalid Number') {
        if (initUnit === 'Invalid Unit') {
          res.send('invalid number and unit');
          return;
        }
        res.send('invalid number');
        return;
      }
      if (initUnit === 'Invalid Unit') {
        res.send('invalid unit');
        return;
      }
      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      res.json({ 'initNum': initNum, 'initUnit': initUnit, 'returnNum': returnNum, 'returnUnit': returnUnit, 'string': toString });
    });
};
