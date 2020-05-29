<?php require './Functions.php';
    // Creates contact in the database
    $requiredProps = ["FirstName","LastName","Email","Phone","UserID"];

    // Gets the information provided in the API call
    $received = file_get_contents('php://input');
    $inputData = getRequestInfo($received);
    if(ensureProps($inputData, $requiredProps))
    {
        // Data to be inserted into database
        $ContactID = "";
        $FirstName = $inputData["FirstName"];
        $LastName = $inputData["LastName"];
        $Email = $inputData["Email"];
        $Phone = $inputData["Phone"];
        $CreationDate = date("U");
        $UserID = $inputData["UserID"];

        // Opens a SQL connection to the database using the stored credentials
        $ini = parse_ini_file("../../php/temp.ini");
        $connection = new mysqli("localhost", $ini["username"], $ini["password"], $ini["db_name"]);

        // If there is an error in the connection, returns a formatted error
        if($connection->connect_error)
        {
            returnWithError(503, $connection->connect_error);
        }
        else
        {
            // Create an SQL statement to insert the provided data into the contacts table.
            $sql = "INSERT INTO Contacts (FirstName, LastName, Email, Phone, CreationDate, UserID) VALUES ('" . $FirstName . "', '" . $LastName . "', '" . $Email . "', '" . $Phone . "', '" . $CreationDate . "', '" . $UserID . "')";

            $connection->query($sql);

            // Since we have no reference field to pull from, get the most recent ContactID
            $sql = "SELECT ContactID FROM Contacts ORDER BY ContactID DESC LIMIT 1";
            $results = $connection->query($sql);
            $row = $results->fetch_assoc();
            // Prepare our output array
            $output = array();
            $output["ContactID"] = $row["ContactID"];
            // Encode and send.
            returnWithInfo($output);
        }

        // Close the connection
        $connection->close();
    }
