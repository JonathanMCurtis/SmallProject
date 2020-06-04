<?php require './Functions.php';
    // Deletes a contact from the database
    $requiredProps = ["ContactID","UserID"];
    // Gets the information provided in the API call
    $received = file_get_contents('php://input');

    $inputData = getRequestInfo($received);
    if(ensureProps($inputData, $requiredProps)) {

        // Data to be inserted into database
        $ContactID = $inputData["ContactID"];
        $UserID = $inputData["UserID"];

        // Opens an SQL connection to the database using the stored credentials
        $ini = parse_ini_file("../../php/temp.ini");
        $connection = new mysqli("localhost", $ini["username"], $ini["password"], $ini["db_name"]);

        // If there is an error in the connection, returns a formatted error
        if ($connection->connect_error) {
            returnWithError(503, $connection->connect_error);
        } else {
            $safety = "SELECT ContactID FROM Contacts WHERE ContactID = " . $ContactID . " AND UserID = " . $UserID;
            $result = $connection->query($safety);

            if (mysqli_num_rows($result) == 1) {
                // SQL query that removes the specified contact, iff it exists and is associated with the given user.
                $sql = "DELETE FROM Contacts WHERE ContactID = " . $ContactID . " AND UserID = '" . $UserID . "'";
                $connection->query($sql);
                returnWithInfo(array());
            } else {
                    returnWithError(204, "No contacts found matching these criteria.");
            }
        }

        // Close the connection
        $connection->close();
    }

