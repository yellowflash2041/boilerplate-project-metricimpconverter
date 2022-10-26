function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    const regex = /[a-z]/i;
    const fractionRegex = /[/]/g;

    const index = input.indexOf(input.match(regex));

    if (index === 0) {
      result = 1;
    }
    else {
      result = input.split('', index).join('');

      const fractionChecker = fractionRegex.test(result);
      if (fractionChecker === true) {
        const doubleFractionMatch = result.match(fractionRegex);
        if (doubleFractionMatch.length !== 1) {
          result = 'Invalid Number';
        }
        else{
          result = eval(result);
        }
      } else {
        result = eval(result);
      }
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    let checker = false;
    const regex = /[a-z]/i;
    index = input.indexOf(input.match(regex));
    result = input.slice(index, input.length).toLowerCase();
    const unitBank = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    for (let i = 0; i < unitBank.length; i++) {
      if (result === unitBank[i]) {
        checker = true;
        if (result === 'l') {
          result = 'L';
        }
      }
    }
    if (!checker) {
      result = 'Invalid Unit';
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    const initialUnit = initUnit.toLowerCase();
    switch (initialUnit) {
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      case 'gal':
        result = 'L';
        break;
      case 'l':
        result = 'gal';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      default:
        result = 'Invalid Unit';
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    const initialUnit = unit.toLowerCase();
    switch (initialUnit) {
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      case 'gal':
        result = 'gallons';
        break;
      case 'l':
        result = 'liters';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      default:
        result = 'Invalid Unit';
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    const initialUnit = initUnit.toLowerCase();
    switch (initialUnit) {
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      default:
        result = 'ERROR';
    }
    if (result !== 'ERROR') {
      result = (result * 100000).toFixed(0) / 100000;
    }
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to ' + returnNum.toFixed(5) + ' ' + this.spellOutUnit(returnUnit);
    return result;
  };
  
}

module.exports = ConvertHandler;
