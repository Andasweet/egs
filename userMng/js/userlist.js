$(document).ready(function () {
    var $masker = $('#maskerWp'),
        cache = {};

    var init = function() {
        initTable();
        btnEvent();
    };

    var btnEvent = function() {
        $('#newBtn').on('click', onAddUserBtnClick);
        $('#excBtn').on('click', onSureExcBtn);
        $('#searchBtn').on('click', onSearchBtnClick);
        $('#serIpt').on('keyup', onSerIptKeyup);
        $('#qxBtn,#closeBtn').on('click', function() {
            $masker.hide();
        });
        $('#sureBtn').on('click',onSureExcBtn);
        $('#tBody').on('click','.delBtn',onDelUserBtnClick);
        $('#tBody').on('click','.updateBtn',onUpdateUserBtnClick);
    };

    var onSerIptKeyup = function(e) {
        // console.log(e.keyCode);
        var kcode = e.keyCode;
        if(kcode==13) {
            $('#searchBtn').trigger('click');
        }
    };

    var onSearchBtnClick = function() {
        var $this = $(this),
            val = $this.parent().find('input').val();
        // if($.trim(val)!==''){
            initTable($.trim(val));
        // }
    };

    var onUpdateUserBtnClick = function() {
        $('#reset').trigger('click');
        var $this = $(this),
            uid = $this.attr('uid'),
            currObj = cache[uid];
        // console.log(currObj)
        var hobd = currObj.hobbies,
            useArr = hobd.split('/');
        $.each(useArr, function (ind,ele) {               
            var newHob = $('input[name=hobbies][value='+ele+']');
            newHob[0].checked='checked';
        })
        $masker.find('#name').val(cache[uid].name);
        $masker.find('#age').val(cache[uid].age);
        $masker.find('#uid').val(cache[uid].id);
        $masker.find('input[name=gender][value='+currObj.gender+']').trigger('click')
        $masker.find('#mobile').val(cache[uid].mobile);
        $masker.find('#address').val(cache[uid].address);
        $masker.find('#edu').val(cache[uid].edu);

        $masker.find('span').html('用户修改');
        $('#sureBtn').hide();
        $('#excBtn').show();
        $masker.show();
    };

    var onDelUserBtnClick = function() {
        $('#reset').trigger('click');

        var url = 'server/DelUser.php',
            uid = $(this).attr('uid');
            // console.log(uid);
        if(confirm('你确定要删除此用户吗？')) {           
            $.get(url, {id:uid}, function() {
                    initTable();                
            })
        }
    };

    var onAddUserBtnClick = function() {
        $('#reset').trigger('click');
        $masker.find('span').html('用户注册');
        $('#excBtn').hide();
        $('#sureBtn').show();
        $masker.show();
    };

    var onSureExcBtn = function() {
        var param,
            vname = $('#name').val(),
            vage = $('#age').val(),
            vmobile = $('#mobile').val(),
            mobileRE = /^1\d{10}$/,
            vaddress = $('#address').val(),
            vedu = $('#edu').val(),
            hobArr = [],
            hobdata = $('input[name=hobbies]:checked');
            // console.log(hobdata)
        var url = 'server/regajax.php';
            $.each(hobdata, function(index,ele) {
                hobArr.push(ele.value);
            });
        param = {
                id: $('#uid').val(),
                name: vname,
                age: vage,
                mobile: vmobile,
                gender: $('input[name=gender]:checked').val(),
                address: vaddress,
                edu: vedu,
                hobbies: hobArr.join('/')
            };
        //check;
        if (vname =='') {
            alert('姓名不能为空');
            return;
        };
        if(!isNaN(vname)) {
            alert('姓名格式不正确');
            return;
        };
        if(vage=='') {
            alert('年龄不能为空');
            return;
        };
        if(isNaN(vage)) {
            alert('年龄格式不正确');
            return;
        };
        if(!mobileRE.test(vmobile)) {
            alert('手机号格式不正确');
            return;
        };
        if(vedu == '请选择') {
            alert('请选择学历');
            return;
        };

        if(!checkhobby(hobdata)) {
            alert('请至少选择一个爱好');
            return;
        }

        function checkhobby(hob) {
            var i,len=hob.length;
            for(i=0; i<len; i++) {
                if(hob[i].checked) {
                    return true;
                };
            };
            return false;       
        }

        if($('#uid').val()) {
            url='server/ajaxUpdateUser.php';
        }

        $.get( url, param, function(data){
           if(data.success) {
                initTable();
                $masker.hide();
           }
        },'json');
    };

    var initTable = function(query) {
        var url = 'server/userlist.php';
        var param;
        if(query){
            param = {query:query};
        };

        $.get( url, param, function(response) {
            // console.log(response);
            if(response.success) {              
                renderTable(response.data);
            }
        },'json');
    }

    var renderTable = function(data) {
        var trs = [];
        var tpl = $('#trTemplate').html();
      
        //check
        if(data.length==0) {
            return;
        }
        _.each(data,function(obj){
            var compiled = _.template(tpl);
            trs.push(compiled(obj));
            cache[obj.id] = obj;
        })

        // console.log(hobbies);

        $('#tBody').html(trs);

        // $.each(data,function(index, obj) {
        //     var hobbies = obj.hobbies;
        //         if(hobbies){
        //             hobbies = obj.hobbies;
        //         } else {
        //             hobbies = '--';
        //         }
        //         // console.log(obj);
        //     trs.push(
        //         '<tr>',
        //             '<td>',obj.name,'</td>',
        //             '<td>',obj.age,'</td>',
        //             '<td>',obj.gender,'</td>',
        //             '<td>',obj.mobile,'</td>',
        //             '<td>',obj.address,'</td>',
        //             '<td>',obj.edu,'</td>',
        //             '<td>',hobbies,'</td>',
        //             '<td>',
        //                 '<button class="btn delBtn" uid="',obj.id,'">删除</button>&nbsp;',
        //                 '<button class="btn updateBtn" uid="',obj.id,'">修改</button>',
        //             '</td>',
        //         '</tr>'
        //         );
        //     cache[obj.id] = obj;
        // });
        // $('#tBody').html(trs.join(''));
    };
    
    init();
});