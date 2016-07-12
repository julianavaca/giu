/* */ 
'use strict';

export default
class AlertService {

  /*@ngInject*/
  constructor() {}

  dismissable(message,success){
    swal({
        title: message.title,
        text: message.message,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancel',
        closeOnConfirm: true
      },
      function(isConfirm){
        if (isConfirm) {
          success();
        }
      });
  }

  success(message){
    swal(message.message, '','success');
  }

  error(message){
    swal(message.title, message.message,'error');
  }

  warning(message, success){
    swal({
        title: message.title,
        text: message.message,
        showCancelButton: true,
        confirmButtonText: 'Ok',
        type: 'warning',
        cancelButtonText: 'Cancel',
        closeOnConfirm: false,
        showLoaderOnConfirm: true
      },
      function(isConfirm){
        if (isConfirm) {
          success();
        }
      });
  }

  info(message){
    swal(message.title, message.message,'info');
  }

}

