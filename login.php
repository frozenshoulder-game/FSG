<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
<link href="css/login.css" rel="stylesheet" type="text/css">
<link href="css/bgi.css" rel="stylesheet" type="text/css">
<title>恢復肩康的養老生活</title>
</head>

<body>
	<form action="login_check.php" method="post" class="login" name="send" onsubmit="return check_error();">
		<h1>登入</h1><hr>
		<h2>帳號</h2>
		<input type="text" name="account" placeholder="請輸入帳號">
		<h2>密碼</h2>
		<input type="password" name="password" placeholder="請輸入密碼">
		<!-- <p><input type="checkbox" value="true">記住我的帳號</p> -->
		<label class="lineshape" for="submit">
			<input type="submit" id="submit" value="登入">
		</label><br>
		<label class="lineshape" for="return">
    		<input type="button" name="return" id="return" value="還沒註冊?" onClick="location.href='addmember.php'">
  		</label><br>
		<label class="lineshape">
    		<input type="button" name="return" id="return" value="回首頁" onClick="location.href='index.html'">
  		</label>
	</form>

<script>//判斷是否有欄位填寫錯誤
function check_error(){
    if(document.send.account.value==''){
    	alert('帳號沒有填喔!!');
    	document.send.account.focus();
    	return false;
    }
    if(document.send.password.value==''){
    	alert('密碼沒有填喔!!');
    	document.send.password.focus();
    	return false;
    }
}
</script>
</body>
</html>
