$(document).ready(function () {
    
    $('button').on('click',function() {
        var name = $('#name').val();
        $.get('server/ajax.php',{name:name},function(data){
            // alert(data);
            console.log(typeof data);
        })
    })
    
});