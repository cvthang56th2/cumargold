<?php 
    $myfile = fopen("latLng.json", "w") or die("Unable to open file!");
    
    $listLatLng = $_GET['data'];

    $listLatLng =  json_encode($listLatLng);

    fwrite($myfile, $listLatLng);
    fclose($myfile);
    echo "Thanh cong"
?>