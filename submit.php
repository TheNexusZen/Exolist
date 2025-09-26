<?php
$logFile = "submissions.log";
$dataFile = "levels.txt";
$blockedWords = ["fuck","shit","bitch","cunt","nigger","fag"];

$ip = $_SERVER['REMOTE_ADDR'];
$time = time();
$log = file_exists($logFile) ? json_decode(file_get_contents($logFile), true) : [];

if (isset($log[$ip]) && ($time - $log[$ip]) < 86400) {
    die("❌ You can only submit once every 24 hours.");
}

$player = trim($_POST['player']);
$name = trim($_POST['name']);
$creator = trim($_POST['creator']);
$victor = trim($_POST['victor']);
$thumbnail = trim($_POST['thumbnail']);
$levellink = trim($_POST['levellink']);

foreach ([$player, $name, $creator, $victor] as $field) {
    foreach ($blockedWords as $word) {
        if (stripos($field, $word) !== false) {
            die("❌ Inappropriate content detected.");
        }
    }
}

$entry = "-----------------------\n";
$entry .= "Submitted by: $player\n";
$entry .= "Level Name: $name\n";
$entry .= "Level Creator: $creator\n";
$entry .= "First Victor: $victor\n";
$entry .= "Thumbnail: $thumbnail\n";
$entry .= "Level Link: $levellink\n";
$entry .= "Submitted: " . date("Y-m-d H:i:s") . "\n";

file_put_contents($dataFile, $entry . "\n", FILE_APPEND);

$log[$ip] = $time;
file_put_contents($logFile, json_encode($log));

echo "✅ Thanks, $player! Your level \"$name\" has been submitted for review.";
?>
