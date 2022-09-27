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
		session_start();
        if(isset($_SESSION['member'])) {
            unset($_SESSION['member']);
            echo '登出成功!!';
            header("Refresh:1;url=index.html");
        } else {
            echo '您還沒登入喔!!';
            header("Refresh:1;url=login.php");
        }
	?>
</div>
</body>
</html>