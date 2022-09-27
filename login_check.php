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
		require('db_connect.php');
		//$password = $_REQUEST['password'];
		session_start();
		unset($_SESSION['member']);
		$sql = $pdo->prepare('select * from member where account=? and password=?');
		$sql->execute([$_REQUEST['account'], md5($_REQUEST['password'])]);
		foreach($sql->fetchAll() as $row) {
			$_SESSION['member']=[
				'id'=>$row['id'], 'name'=>$row['name'], 'account'=>$row['account'], 'password'=>$row['password']
			];
		}
		
		if (isset($_SESSION['member'])) {
			echo '哈囉 ', $_SESSION['member']['name'], ' 歡迎回來!!' . '<br>';
			header("Refresh:2;url=enter.php");
		} else {
			echo '帳號或密碼打錯囉!';
			header("Refresh:2;url=login.php");
		}
	?>
</div>
</body>
</html>