<?php require './Functions.php';
    // Gets the information provided in the API call
    $received = file_get_contents('php://input');
    // Checks whether the login information provided is accurate.
    $requiredProps = ["User","Password"];

    $inputData = getRequestInfo($received);
    if(ensureProps($inputData, $requiredProps))
    {
        $User = $inputData["User"];
        $Password = $inputData["Password"];

        // Opens an SQL connection to the database using the stored credentials
        $ini = parse_ini_file("../../php/temp.ini");
        $conn = new mysqli("localhost", $ini["username"], $ini["password"], $ini["db_name"]);

        // If the connection status returns an error, return with a connection error
        if ($conn->connect_error) {
            returnWithError(503, $conn->connect_error);
        } else {
            // Otherwise, check to see if a row matches the provided login information
            $sql = "SELECT UserID,FirstName,LastName FROM Users where User='" . $User . "' and Password='" . $Password . "'";
            // Execute this query, and store the results in a new variable called 'result'
            $result = $conn->query($sql);
            // If there is at least one row returned
            if ($result->num_rows > 0) {
                // Get the associated row with this result
                $row = $result->fetch_assoc();
                // Create an array for our JSON output
                $output = array();
                $output["ErrorID"] = 0;
                $output["Error"] = "";
                $output["UserID"] = $row["UserID"];
                $output["FirstName"] = $row["FirstName"];
                $output["LastName"] = $row["LastName"];

                // Send this output to be encoded and returned
                returnWithInfo($output);
            } else {
                // Otherwise, no record matching that exists (either user doesn't exist, or invalid password)
                returnWithError(401, "Incorrect Username or Password");
            }
            // Close the connection
            $conn->close();
        }
    }
