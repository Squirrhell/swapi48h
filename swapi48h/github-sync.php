<?php
        $cmd = shell_exec("rm -rf swapi48h
&& git clone https://github.com/Squirrhell/swapi48h.git
&& rm -rf swapi48h/.git
");

echo $cmd;

?>
