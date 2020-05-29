<?php require './Functions.php';
    // Updates a contact record in the database
    $requiredProps = ["ContactID","FirstName", "LastName", "Email", "Phone", "UserID"];

    // Gets the information provided in the API call
    $received = file_get_contents('php://input');
    $inputData = getRequestInfo($received);
    if(ensureProps($inputData, $requiredProps)) {

        // Data to be inserted into database
        $ContactID = $inputData["ContactID"];
        $FirstName = $inputData["FirstName"];
        $LastName = $inputData["LastName"];
        $Email = $inputData["Email"];
        $Phone = $inputData["Phone"];
        $UserID = $inputData["UserID"];

        // Opens an SQL connection to the database using the stored credentials
        $ini = parse_ini_file("../../php/temp.ini");
        $connection = new mysqli("localhost", $ini["username"], $ini["password"], $ini["db_name"]);

        // If there is an error in the connection, returns a formatted error
        if ($connection->connect_error) {
            returnWithError(503, $connection->connect_error);
        } else {
            $sql = "SELECT ContactID FROM Contacts WHERE ContactID = '" . $inputData["ContactID"] . "' AND UserID = '" . $inputData["UserID"] . "'";

            $result = $connection->query($sql);

            if (mysqli_num_rows($result) != 0) {
                $sql = "UPDATE Contacts SET FirstName = '" . $FirstName . "', LastName = '" . $LastName . "', Email = '" . $Email . "', Phone = '" . $Phone . "', CreationDate = '" . $CreationDate . "' WHERE ContactID = '" . $ContactID . "'";

                $connection->query($sql);
                returnWithInfo(array());
            } else {
                returnWithError(204, "This contact does not exist.");
            }
        }

        // Close the connection
        $connection->close();
    }
