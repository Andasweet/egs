!function() {

    var app = angular.module('myApp',[]);

    app.filter('fmtHobbies', function() {
        return function(hobbies) {
            var h;
            try {
                h = _.filter(_.values($.parseJSON(hobbies)), function(val) {return val != ''}).join('|');
            } catch(e) {
                h = hobbies;
            }
            return h;
        };
    });

    app.controller('myController', function($scope, $http) {
        $scope.exc = false;
        $scope.pageSize = 5;
        $scope.page = 0;


        $scope.lastPageClick = function () {
            $scope.page = getTotalPage()-1;
            renderTable();
        }

        $scope.firstPageClick = function () {
            $scope.page = 0;
            renderTable();
        }

        $scope.pagingClick = function () {
            $scope.page = this.tmpPage;
            renderTable();
        }

        $scope.serBtnClick = function () {
            renderTable();
        }

        $scope.qxBtnClick = function () {
            $scope.user = {};
        }

        $scope.saveExcBtnClick = function () {
            $http({
                url: '../server/ajaxUpdateUser.php',
                method: 'get',
                params: this.user
            }).success(function(response) {
                renderTable();
                $('#useDialog').modal('hide');//
                $scope.user = {};
            });
        }

        $scope.excBtnClick = function() {
            $scope.title = "修改用户";
            $scope.exc = true;
            this.user.hobbies = JSON.parse(this.user.hobbies);
            // console.log(this.user);
            $('#useDialog').modal('show');
            $scope.user = this.user;
        };

        $scope.delBtnClick = function() {
            if(confirm('你确定要删除该用户吗？')) {      
                var id = this.user.id;   
                $http({
                    url: '../server/DelUser.php',
                    method: 'get',
                    params: {id:id}
                }).success(function(response) {
                    renderTable();                 
                });
            }
        };

        $scope.sureBtnClick = function() {
            // $scope.user.hobbies = '跑步|旅游';
            $scope.user.img = 'abc.png';

            $scope.user.hobbies = JSON.stringify($scope.user.hobbies);//ie8y以下不支持

            $http({
                url: '../server/regajax.php',
                method: 'get',
                params: $scope.user
            }).success(function(response) {
                renderTable();
                $('#useDialog').modal('hide');//
                $scope.user = {};
            });
        };

        $scope.addNewUser = function() {
            $scope.title = "用户注册";
            $('#useDialog').modal('show');//
        };

        function renderTable() {    
            $http({
                    url: '../server/userlist.php',
                    method: 'get',
                    params:{
                        size: $scope.pageSize, 
                        query: $scope.query,
                        page: $scope.page
                    }

                }).success(function(response) {
                    if (response.success) {
                        $scope.users = response.data;
                        $scope.total = response.total;
                        // $scope.pageArr = _.range(0, getTotalPage());
                        renderPaging();
                    }
            });
        }
        renderTable();

        function renderPaging() {
            $scope.pageArr = _.range(0, getTotalPage());
        }
        
        function getTotalPage() {
            return parseInt($scope.total / $scope.pageSize) + 1;
        }

        renderTable();
        
    });


}();