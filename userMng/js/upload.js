!function() {
    $('#Pic').on('change', function() {
        $('#iptForm').submit();
    })

    $('#regBtn').on('click', function() {
        var name = $('#username').val();
        var picName = JSON.parse($('#helper').contents().text()).fileName;
        param = {
            userName: name,
            fileName: picName
        }
        console.log(picName);
        $('#img').attr('src','server/uploadImgs/'+picName);
    })
}();