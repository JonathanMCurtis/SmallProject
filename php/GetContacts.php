<?php require './Functions.php';
    // Gets all contacts associated with a given user.
    $requiredProps = ["UserID"];

    // Gets the information provided in the API call
    $received = file_get_contents('php://input');
    $inputData = getRequestInfo($received);
    if(ensureProps($inputData, $requiredProps)) {
        $UserID = $inputData["UserID"];

        // Opens an SQL connection to the database using the stored credentials
        $ini = parse_ini_file("../../php/temp.ini");
        $connection = new mysqli("localhost", $ini["username"], $ini["password"], $ini["db_name"]);

        if ($connection->connect_error) {
            returnWithError(503, $connection->connect_error);
        } else {
            $sql =  "SELECT ContactID, FirstName, LastName, Email, Phone, ".
                    "FROM_UNIXTIME(CreationDate, '%m/%d/%y') as CreationDate ".
                    "FROM Contacts WHERE UserID = " . $UserID .
                    " ORDER BY LastName ASC, FirstName ASC";
            $result = $connection->query($sql);

            if (!mysqli_num_rows($result)==0) {
                $connection->close();
                returnWithList($result, true);
            } else {
                $connection->close();
                returnWithError(204, "No contacts associated with that User ID.");
            }
        }
        $connection->close();
    }
