const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('Function convertHandler.getNum(input)', () => {
    test('Whole number input', done => {
      const input = '32L';
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test('Decimal Input', done => {
      const input = '3.1KM';
      assert.equal(convertHandler.getNum(input), 3.1);
      done();
    });

    test('Fractional Input', done => {
      const input = '3/2L';
      assert.equal(convertHandler.getNum(input), 1.5);
      done();
    });

    test('Fractional Input w/ Decimal', done => {
      const input = '3.3/3mi';
      assert.equal(convertHandler.getNum(input), 1.0999999999999999);
      done();
    });

    test('Invalid Input (double fraction)', done => {
      const input = '3//3mi';
      assert.equal(convertHandler.getNum(input), 'Invalid Number');
      done();
    });

    test('No Numerical Input', done => {
      const input = 'mi';
      assert.equal(convertHandler.getNum(input), 1);
      done();
    }); 
  });

  suite('Function convertHandler.getUnit(input)', () => {
    test('For Each Valid Unit Inputs', done => {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
      input.forEach(element => {
        assert.equal(convertHandler.getUnit(element), element.toLowerCase() === 'l' ? 'L' : element.toLocaleLowerCase());
      });
      done();
    });

    test('Unknown Unit Input', done => {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
      input.forEach(element => {
        assert.notEqual(convertHandler.getUnit(element), 'Invalid Unit');
      });
      done();
    });  
  });

  suite('Function convertHandler.getReturnUnit(initUnit)', () => {
    test('For Each Valid Unit Inputs', done => {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      const expect = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
      input.forEach((element, i) => {
        assert.equal(convertHandler.getReturnUnit(element), expect[i]);
      });
      done();
    });
  });  

  suite('Function convertHandler.spellOutUnit(unit)', () => {
    test('For Each Valid Unit Inputs', done => {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      const expected = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
      input.forEach((element, i) => {
        assert.equal(convertHandler.spellOutUnit(element), expected[i]);
      });
      done();
    });
  });

  suite('Function convertHandler.convert(num, unit)', () => {
    test('Gal to L', done => {
      const input = [5, 'gal'];
      const expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    test('L to Gal', done => {
      const input = [5, 'l'];
      const expected = 1.32086;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    test('Mi to Km', done => {
      const input = [5, 'mi'];
      const expected = 8.0467;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    test('Km to Mi', done => {
      const input = [5, 'km'];
      const expected = 3.10686;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    test('Lbs to Kg', done => {
      const input = [1, 'lbs'];
      const expected = 0.45359;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    test('Kg to Lbs', done => {
      const input = [1, 'kg'];
      const expected = 2.20462;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
  });
});