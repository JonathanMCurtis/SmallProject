<?php
    // Updates contact in the database

    // Gets the information provided in the file call
    $inputData = getRequestInfo();

    // Data to be inserted into database
    $ID = $inputData["ID"];
    $FirstName = $inputData["FirstName"];
    $LastName = $inputData["LastName"];
    $Email = $inputData["Email"];
    $Phone = $inputData["Phone"];
    $CreationDate = date("d-m-Y");
    $User = $inputData["User"];

    // Opens an SQL connection to the database using the credentials below
    $connection = new mysqli("localhost", "smallProject", "thisIsInsecure", "SmallProjectDB");

    // If there is an error in the connection, returns a formatted error
    if($connection->connect_error)
    {
        returnWithError($connection->connect_error);
    }
    else
    {
        $sql = "SELECT ID FROM Contacts WHERE ID = '" . $inputData["ID"] . "' AND User = '" . $inputData["User"] ."'";

        $result = $connection->query($sql);

        if($result->num_rows > 0)
        {

          // Create an SQL statement to insert the provided data into the contacts
          // table.
          $sql = "UPDATE Contacts SET FirstName = '" . $FirstName . "', LastName = '" . $LastName . "', Email = '" . $Email . "', Phone = '" . $Phone . "', CreationDate = '" . $CreationDate . "' WHERE ID = '" . $ID . "'";

          $connection->query($sql);
        }

        else
        {
          returnWithError("This contact does not exist.");
        }
    }

    // Close the connection
    $connection->close();

    function getRequestInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
    }

    function returnWithError($error)
    {
        $retValue = '{"ID":"","FirstName":"", "LastName":"","Email":"", "Phone":"","CreationDate":"", "User":"", "error":"' . $error . '"}';
        sendResultInfoAsJson($retValue);
    }

    function sendResultInfoAsJson($obj)
    {
        header('Content-type: application/json');
        echo $obj;
    }

 ?>
