<?php require './Functions.php';
    // Gets a specific contact's info
    $requiredProps = ["ContactID","UserID"];

    // Gets the information provided in the API call
    $received = file_get_contents('php://input');
    $inputData = getRequestInfo($received);
    if(ensureProps($inputData, $requiredProps)) {

        $ContactID = $inputData["ContactID"];
        $UserID = $inputData["UserID"];

        // Opens an SQL connection to the database using the stored credentials
        $ini = parse_ini_file("../../php/temp.ini");
        $connection = new mysqli("localhost", $ini["username"], $ini["password"], $ini["db_name"]);

        // If there is an error in the connection, returns a formatted error
        if ($connection->connect_error) {
            returnWithError(503, $connection->connect_error);
        } else {
            // Create an SQL statement to get data from contacts table from contact
            // with the provided ID/
            $sql = "SELECT FirstName,LastName,Email,Phone FROM Contacts where UserID = " . $UserID . " AND ContactID = '" . $ContactID . "'";

            $result = $connection->query($sql);

            if (!mysqli_num_rows($result)==0) {
                // Get the associated row with this result
                $row = $result->fetch_assoc();

                $output = array();
                $output["FirstName"] = $row["FirstName"];
                $output["LastName"] = $row["LastName"];
                $output["Email"] = $row["Email"];
                $output["Phone"] = $row["Phone"];

                $connection->close();
                returnWithInfo($output);
            } else {
                // No result exists
                $connection->close();
                returnWithError(204, "Contact does not exist");
            }
        }

        // Close the connection
        $connection->close();
    }
