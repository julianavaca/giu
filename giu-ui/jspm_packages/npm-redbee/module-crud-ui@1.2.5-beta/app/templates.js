/* */ 
"format esm";
angular.module("module-crud-ui-templates",[]).run(["$templateCache",function(a){a.put("views/crud.page.navigator.html",'<div table-pagination=params><div class=table-pager><ul class="pagination table-pagination"><li ng-class="{disabled: vmPagination.pageable.page.first}"><a ng-click="vmPagination.pageable.page.first || vmPagination.change(vmPagination.pageable.page.number-1)"><i class="zmdi zmdi-chevron-left"></i></a></li><li ng-class="{disabled: vmPagination.pageable.page.last}"><a ng-click="vmPagination.pageable.page.last || vmPagination.change(vmPagination.pageable.page.number+1)"><i class="zmdi zmdi-chevron-right"></i></a></li></ul></div></div>'),a.put("views/crud.wizard.html",'<section id=content><md-card><div class="form-fullpage card" layout=column layout-margin="" flex=""><div ng-cloak=""><md-content><md-tabs md-dynamic-height="" md-border-bottom="" md-selected=vm.tabIndex><md-tab label="{{ state.label | translate}}" md-active=vm.isTabActive($index) ng-repeat="state in vm.stateList track by $index" ng-click=vm.goToTab($index) ng-disabled=!vm.isTabEnabled($index)></md-tab></md-tabs><div ui-view=""></div><div class="form-buttons fg-line"><button ng-click=vm.save() class=btn-blue>{{\'wizard.form.submit.finish\'|translate}}</button> <button ng-click=vm.next() class=btn-blue ng-hide=vm.isLast()>{{\'wizard.form.submit.next\'|translate}}</button> <button ng-click=vm.cancel()>{{\'wizard.form.cancel\'|translate}}</button></div></md-content></div></div></md-card></section>')}]);