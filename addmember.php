<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="css/login.css" rel="stylesheet" type="text/css">
<link href="css/bgi.css" rel="stylesheet" type="text/css">
<title>恢復肩康的養老生活</title>
</head>

<body>
<form action="checkmember.php"  method="post" enctype="multipart/form-data" name="send" id="form1" class="login" onsubmit="return check_error();">
  <h1>註冊帳號</h1>
  <hr>
  <h2>姓名:</h2>
  <input name="name" type="text" id="name" placeholder="請輸入姓名">
  <h2>帳號:</h2>
  <input name="account" type="text" id="account" placeholder="請輸入5~20字元">
  <h2>密碼:</h2>
  <!--<img width="35px" id="demo_img" onClick="hideShowPsw()" src="images/invisible.png">-->
  <input name="password" type="password" id="password" placeholder="請輸入8~20字元含大小寫英文與數字">
  <label class="lineshape" for="submit">
    <input type="submit" name="submit" id="submit" value="送出">
  </label>
  <br>
  <label class="lineshape" for="return">
    <input type="button" name="return" id="return" value="返回" onClick="location.href='login.php'">
  </label>
</form>

<!--<script>//隱藏或顯示密碼
	var demoImg = document.getElementById("demo_img");
	var demoInput = document.getElementById("password");
	function hideShowPsw(){
		if (demoInput.type == "password") {
			demoInput.type = "text";
			demo_img.src = "images/visible.png";
		}else {
			demoInput.type = "password";
			demo_img.src = "images/invisible.png";
		}
	}
</script>--> 

<script>//判斷是否有欄位填寫錯誤
  function check_error(){
	if(document.send.name.value==''){
      alert('姓名沒有填喔!!');
      document.send.name.focus();
      return false;
    }
    if(document.send.account.value==''){
      alert('帳號沒有填喔!!');
      document.send.account.focus();
      return false;
    }else{
	acl = document.send.account.value;
	if(acl.length < 5 || acl.length > 20){
	  alert('帳號必須輸入5-20字元喔!!');
      document.send.account.focus();
      return false;
	  }
	}
    if(document.send.password.value==''){
      alert('密碼沒有填喔!!');
      document.send.password.focus();
      return false;
    }
	var pw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/; 
	if(pw.test(password.value)){
		return true;
	}else
		alert("密碼必須由8-20位大小寫字母、數字組成喔!!");
	    document.send.password.focus();
		return false;
	}
</script>
</body>
</html>