<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    
    if($_GET['request'] === 'getFileList'){
        
        $files = scandir('./MyFiles');
        for($i = 0; $i < count($files); $i++){
            if($files[$i] != '.' && $files[$i] != '..'){
                echo $files[$i];
                if($i != count($files)-1){
                    echo "\r\n";     
                }
            }
        }
        
    }else if($_GET['request'] === 'loadFile'){ 
        
        echo file_get_contents('./MyFiles/' . $_GET['file'], FILE_USE_INCLUDE_PATH);
        
    }
    
}