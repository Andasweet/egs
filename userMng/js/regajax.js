$(document).ready(function () {
    var param;
    $('button').on('click',function() {
        var hobArr=[],
            hobdata = $('input[name=hobbies]:checked');
            // console.log(hobdata);
            $.each(hobdata, function(index,ele) {
            // console.log(ele);
                hobArr.push(ele.value);
            });

        param = {
            name: $('#name').val(),
            age: $('#age').val(),
            mobile: $('#mobile').val(),
            gender: $('input[name=gender]:checked').val(),
            address: $('#address').val(),
            edu: $('#edu').val(),
            hobbies: hobArr.join('/')
        };
          
        $.get( 'server/regajax.php', param, function(data){
           console.log(data);
        },'json')
    })
    
});