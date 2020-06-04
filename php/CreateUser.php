<?php require './Functions.php';
    // Gets the information provided in the API call
    $received = file_get_contents('php://input');

    // Creates user in the database
    $requiredProps = ["User","Password","FirstName","LastName"];
    $inputData = getRequestInfo($received);
    if(ensureProps($inputData, $requiredProps))
    {
        // Declare variables to hold all required JSON input
        $UserID = 0;
        $User = $inputData["User"];
        $Password = $inputData["Password"];
        $FirstName = $inputData["FirstName"];
        $LastName = $inputData["LastName"];

        if (strlen($inputData["User"]) < 1)
            returnWithError(409, "Invalid username");

        // Opens an SQL connection to the database using the stored credentials
        $ini = parse_ini_file("../../php/temp.ini");
        $conn = new mysqli("localhost", $ini["username"], $ini["password"], $ini["db_name"]);

        // If the connection status returns an error, return with a connection error
        if ($conn->connect_error) {
            returnWithError(503, $conn->connect_error, "", $inputData);
        } else {
            // Otherwise, check if the provided Username is already in use.
            $sql = "SELECT UserID FROM Users where User='" . $User . "'";
            // Execute this query, and store the results in a new variable called 'result'
            $result = $conn->query($sql);
            // If there is at least one row returned
            if (!mysqli_num_rows($result)==0) {
                // Then this account already exists, return an error stating such.
                returnWithError(409, "An account already exists with the given username.");
            } else {
                // Otherwise, this UserID is available
                $newUser = "INSERT INTO Users(FirstName, LastName, User, Password) VALUES ('" . $FirstName . "', '" . $LastName . "', '" . $User . "', '" . $Password . "')";
                $conn->query($newUser);

                // Since the User field is unique, we can get the ID querying for an equivalent user.
                $newAccountID = "SELECT UserID, FirstName, LastName FROM Users WHERE User='" . $User . "'";
                $result = $conn->query($newAccountID);

                // Get the associated result
                $row = $result->fetch_assoc();
                // Declare an associative array for our JSON output
                $output = array();
                // Populate the JSON output array with the result data
                $output["ErrorID"] = 0;
                $output["Error"] = "";
                $output["UserID"] = $row["UserID"];
                $output["FirstName"] = $row["FirstName"];
                $output["LastName"] = $row["LastName"];
                // Send result to be JSON encoded and returned.
                returnWithInfo($output);
            }
            // Close the connection
            $conn->close();
        }
    }
