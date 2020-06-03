<?php require './Functions.php';
    // Creates contact in the database
    $requiredProps = ["UserID","Search"];

    // Gets the information provided in the API call
    $received = file_get_contents('php://input');
    $inputData = getRequestInfo($received);
    if(ensureProps($inputData, $requiredProps)) {

        $UserID = $inputData["UserID"];
        $Search = $inputData["Search"];

        // Opens an SQL connection to the database using the stored credentials
        $ini = parse_ini_file("../../php/temp.ini");
        $connection = new mysqli("localhost", $ini["username"], $ini["password"], $ini["db_name"]);

        if ($connection->connect_error)
        {
            returnWithError(503, $connection->connect_error);
        }
        else
        {
            strtolower($Search);
            $sql = "SELECT ContactID, FirstName, LastName, Email, Phone, FROM_UNIXTIME(CreationDate, '%m/%d/%y') AS CreationDate ".
                   "FROM Contacts WHERE (   lower(FirstName) LIKE '%" . $Search .
                                    "%' OR  lower(LastName) LIKE '%" . $Search .
                                    "%' OR  lower(Email) LIKE '%" . $Search .
                                    "%' OR  Phone LIKE '%" . $Search . "%') " .
                                    "AND   UserID = " . $UserID .
                                    " ORDER BY LastName ASC, FirstName ASC";

            $result = $connection->query($sql);

            if (mysqli_num_rows($result) != 0) {
                returnWithList($result);
            } else {
                returnWithError(204, "No contacts meet this search criteria.");
            }
            $connection->close();
        }
    }
