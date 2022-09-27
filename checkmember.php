<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link href="css/login.css" rel="stylesheet" type="text/css">
<link href="css/bgi.css" rel="stylesheet" type="text/css">
<title>恢復肩康的養老生活</title>
</head>

<body>
<div class="login">
<?php
	$name = $_REQUEST['name'];
	$account = $_REQUEST['account'];
	$password = $_REQUEST['password'];
	//$hash = password_hash($password, PASSWORD_DEFAULT);
	
	
	require('db_connect.php');
	$sql = "select * from member where account = :account";
    $chk = $pdo->prepare($sql);
    //$account = $_REQUEST['account'];
    $chk->bindParam(':account',$account);
    $chk->execute();
    $total = $chk->rowCount();
	if ($total >=1){
		echo '此帳號已經被使用了!' . '<br>';
		echo '將重新導回註冊頁面';
		header('Refresh:3;url=addmember.php');
		exit;
	  }else{
	$sql = $pdo->prepare('insert into member values(null,?,?,?,null)');
	if ($sql->execute([$name, $account, md5($password)])){
		echo '註冊成功!' . '<br>';
		header("Refresh:2;url=login.php");
		exit;
	}
	else{
		echo '註冊失敗!' . '<br>';
		header("Refresh:2;url=addmember.php");
	  }
	}
?>
</div>	
</body>
</html>