import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'amountWords'
})
export class AmountWordsPipe implements PipeTransform {

//   transform(num: any): any {
//     const a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
//     const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
//
//     // function inWords (num) {
//     if ((num = num.toString()).length > 9) {
//       return 'overflow';
//     }
//     let n: any = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
//     if (!n) {
//       return;
//     }
//     let str = '';
//     // str += (n[1] !== 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
//     // str += (n[2] !== 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
//     str += (n[3] !== 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
//     str += (n[4] !== 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
//     str += (n[5] !== 0) ? ((str !== '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
//     return str;
//     // }
//   }
// }
//



  transform(value: any, args?: any): any {
    if (value) {
      value = parseFloat(value).toFixed(2);
      const amounth = value.toString().split('.');
      let price: any = amounth[0];
      const pointer: any = amounth.length > 0 ? amounth[1] : null;
      const singleDigit = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'],
          doubleDigit = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'],
          tensPlace = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'],
          handle_tens = function(digit: any, prevdigit: any) {
            return 0 === digit ? '' : ' ' + (1 === digit ? doubleDigit[prevdigit] : tensPlace[digit]);
          },
          handle_utlc = function(digit: any, nextdigit: any, denom: any) {
            return (0 !== digit && 1 !== nextdigit ? ' ' + singleDigit[digit] : '') + (0 !== nextdigit || digit > 0 ? ' ' + denom : '');
          };
      let rupees = '',
          digitIndex = 0,
          digit = 0,
          nextDigit = 0,
          words = [],
          paisaWords = [],
          paisa = '';
      if (price += '', isNaN(parseFloat(price))) { rupees = ''; }
      else if (parseFloat(price) > 0 && price.length <= 10) {
        for (digitIndex = price.length - 1; digitIndex >= 0; digitIndex--) {
          switch (digit = price[digitIndex] - 0, nextDigit = digitIndex > 0 ? price[digitIndex - 1] - 0 : 0, price.length - digitIndex - 1) {
            case 0:
              words.push(handle_utlc(digit, nextDigit, ''));
              break;
            case 1:
              words.push(handle_tens(digit, price[digitIndex + 1]));
              break;
            case 2:
              words.push(0 !== digit ? ' ' + singleDigit[digit] + ' Hundred' + (0 !== price[digitIndex + 1] && 0 !== price[digitIndex + 2] ? ' and' : '') : '');
              break;
            case 3:
              words.push(handle_utlc(digit, nextDigit, 'Thousand'));
              break;
            case 4:
              words.push(handle_tens(digit, price[digitIndex + 1]));
              break;
            case 5:
              words.push(handle_utlc(digit, nextDigit, 'Lakh'));
              break;
            case 6:
              words.push(handle_tens(digit, price[digitIndex + 1]));
              break;
            case 7:
              words.push(handle_utlc(digit, nextDigit, 'Crore'));
              break;
            case 8:
              words.push(handle_tens(digit, price[digitIndex + 1]));
              break;
            case 9:
              words.push(0 !== digit ? ' ' + singleDigit[digit] + ' Hundred' + (0 !== price[digitIndex + 1] || 0 !== price[digitIndex + 2] ? ' and' : ' Crore') : '');
          }
        }
        rupees = words.reverse().join('');
      } else { rupees = ''; }
      if (rupees) {
        rupees = `${rupees} Rupees`;
      }
      if (pointer !== '00') {
        digitIndex = 0;
        digit = 0;
        nextDigit = 0;
        for (digitIndex = pointer.length - 1; digitIndex >= 0; digitIndex--) {
          switch (digit = pointer[digitIndex] - 0, nextDigit = digitIndex > 0 ? pointer[digitIndex - 1] - 0 : 0, pointer.length - digitIndex - 1) {
            case 0:
              paisaWords.push(handle_utlc(digit, nextDigit, ''));
              break;
            case 1:
              paisaWords.push(handle_tens(digit, pointer[digitIndex + 1]));
              break;
          }
        }
        paisa = paisaWords.reverse().join('');
        if (rupees) {
          rupees = `${rupees} and ${paisa} Paisa`;
        }
        else {
          rupees = `${paisa} Paisa`;
        }
      }
      return rupees;
    }
  }
}
