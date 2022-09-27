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
<table class="table-bordered table-sm shadow p-3 mb-5 bg-light rounded" width='400px'>
  <tbody>
    <tr>
      <td>姓名</td>
      <td>次數</td>
      <td>花費時長</td>
      <td>復健日期</td>
    </tr>
	 
	<?php 
  require('db_connect.php');
  /* $sql = 'select * from game_1'; */
  $sql = $pdo->prepare('select * from game_1');
  foreach ($sql->fetchAll() as $row)
		{
			echo '<tr>';
			echo '<td>' . $row['name'] . '</td>';
			echo '<td>' . $row['frequency'] . '</td>';
			echo '<td>' . $row['spendtime'] . '</td>';
			echo '<td>' . $row['create_date'] . '</td>';
			echo '</tr>';
		}
	?>
	  
  </tbody>
</table>
<label class="lineshape" for="return">
    <input type="button" name="return" id="return" value="返回" onClick="location.href='enter.php'">
  </label>
</div>
</body>
</html>