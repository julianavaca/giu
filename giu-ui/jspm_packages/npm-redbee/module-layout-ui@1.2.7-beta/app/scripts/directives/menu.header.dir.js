/* */ 
'use strict';

export default class HeaderDirective {

  constructor() {
    this.restrict = 'E';
    this.replace = true;
    this.templateUrl = 'views/menu.header.html';
    this.scope = {};
    this.bindToController = {
      title: '@'
    };
    this.controller = HeaderDirController;
    this.controllerAs = 'ctrl';
  }

  link() {

    $('#top-search a').on('click', function (){
      $('#header').addClass('search-toggled');
    });

    $('#top-search-close').on('click', function (){
      $('#header').removeClass('search-toggled');
    });

    /*
     * Fullscreen Browsing
     */
    if ($('[data-action="fullscreen"]')[0]) {
      var fs = $('[data-action="fullscreen"]');
      fs.on('click', function (e) {
        e.preventDefault();

        //Launch
        function launchIntoFullscreen(element) {

          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
          } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
          }
        }

        //Exit
        function exitFullscreen() {

          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          }
        }

        launchIntoFullscreen(document.documentElement);
        fs.closest('.dropdown').removeClass('open');
      });
    }


    (function () {
      //Get saved layout type from LocalStorage
      var layoutStatus = localStorage.getItem('ma-layout-status');
      if (layoutStatus === 1) {
        $('body').addClass('sw-toggled');
        $('#tw-switch').prop('checked', true);
      }

      $('body').on('change', '#toggle-width input:checkbox', function () {
        if ($(this).is(':checked')) {
          setTimeout(function () {
            $('body').addClass('toggled sw-toggled');
            localStorage.setItem('ma-layout-status', 1);
          }, 250);
        }
        else {
          setTimeout(function () {
            $('body').removeClass('toggled sw-toggled');
            localStorage.setItem('ma-layout-status', 0);
            $('.main-menu > li').removeClass('animated');
          }, 250);
        }
      });
    })();
  }

  static directiveFactory() {
    var instance = new HeaderDirective();
    return instance;
  }

}

class HeaderDirController {

  /*@ngInject*/
  constructor() {
  }

}

