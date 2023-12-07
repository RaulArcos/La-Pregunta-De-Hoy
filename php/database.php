<?php
// Database connection parameters
$servername = "localhost";
$username = "root";
$password = ""; //testing purposes only
$dbname = "preguntadehoy";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch a random question from the database (replace 'questions' with your actual table name)
$sql = "SELECT * FROM pregunta ORDER BY RAND() LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output data of the first row
    $row = $result->fetch_assoc();
    if($row["usable"] == True){
        $question = $row["texto"];
    }
    

    // Close connection
    $conn->close();
} else {
    $question = "No question found.";
}

?>