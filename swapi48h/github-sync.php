<?php
        $cmd = shell_exec("sudo rm -rf swapi48h
&& sudo git clone https://github.com/Squirrhell/swapi48h.git
&& sudo rm -rf swapi48h/.git
");

echo $cmd;

?>
