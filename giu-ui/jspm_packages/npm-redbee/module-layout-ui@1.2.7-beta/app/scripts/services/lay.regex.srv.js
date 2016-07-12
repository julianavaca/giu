/* */ 
'use strict';

export default
class RegexService {

  constructor() {
    this.timeWithFrameRegExp = new RegExp('^([01]?[0-9]|2[0-3]):[0-5][0-9]:([0-5]{1}[0-9]{1}):([0-2]?[0-9]|3[0])$');
    this.timeRegExp = new RegExp('^([01]?[0-9]|2[0-3]):[0-5][0-9]:([0-5]{1}[0-9]{1})$');
    this.singleRegExp = new RegExp('^[\u00F1A-Za-z0-9Ññ ]+$');
    this.singleWithoutSpaceRegExp = new RegExp('^[\u00F1A-Za-z0-9Ññ]+$');
  }

  timeWithFramePattern(){
    return this.timeWithFrameRegExp;
  }

  timePattern(){
    return this.timeRegExp;
  }

  singlePattern(){
    return this.singleRegExp;
  }

  singleWithOutSpacePattern(){
    return this.singleWithoutSpaceRegExp;
  }

}


