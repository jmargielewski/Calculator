import { Calculator } from "./Calculator";

class DecCalculator extends Calculator{
  constructor(settings){
    super(settings);
    console.log(this.getName());
  }

  changeNumber(root) {
      let activeElement = root.find('.active');
      activeElement.attr('contenteditable', true).empty();
      root.children(":first-child").trigger("focus");
  } // *** changeNumber ***

  initEvents() {
      this.$calculatorDOMElement.find(".display-number").on('click', (event) => {
          const parentLabel = $(event.target).parent(".display-number");
          const clickToAdd = $('.tooltip').slideDown(500);
          this.changeNumber(parentLabel);
       }) //
      this.$calculatorDOMElement.find(".operator-bar span").on('click', (event) => {
          this.clickToAdd = $('.tooltip').hide(500);
          this.checkNumber();
          this.updateResult();
       });
  } // *** initEvents ***

  add(numberX, numberY) {
      let result = [0,0,0,0,0,0,0,0,0];
      for(let i = numberX.length - 1; i >= 0  ; i--) {
          let carryBit =  numberX[i] + numberY[i] + result[i];
          // console.log(carryBit);
          if( carryBit  >= 10) {
              result[i] = carryBit % 10;
              result[i-1] = 1;
          }else {
              result[i] = carryBit;
          }
      }
      return result;
  } // *** add ***

  updateResult() {
      let root =  this.$calculatorDOMElement;
      let $resultNumber = root.children(".group-number").children(".result-bit");
      for(let i =  this.resultNumberArray.length - 1, j = 0; i >= 0 ; i--, j++) {
          let valueResult = parseInt( $resultNumber.eq(j).find(".active").text(this.resultNumberArray[i]) );
      }
  } // *** updateResult ***


} // DecCalculator

export { DecCalculator };
