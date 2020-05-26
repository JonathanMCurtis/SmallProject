<?php
    // Creates contact in the database

    // Gets the information provided in the file call
    $inputData = getRequestInfo();

    // Data to be inserted into database
    $ID = "";
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
        // Create an SQL statement to insert the provided data into the contacts
        // table.
        $sql = "INSERT INTO Contacts (FirstName, LastName, Email, Phone, CreationDate, User) VALUES ('" . $FirstName . "', '" . $LastName . "', '" . $Email . "', '" . $Phone . "', '" . $CreationDate . "', '" . $User . "')";

        $connection->query($sql);
        returnWithInfo($FirstName, $LastName, $id);
    }

    // Close the connection
    $connection->close();



    function getRequestInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
    }

    function returnWithInfo($firstName, $lastName, $id)
    {
    $retValue = '{"id": "' . $id . '","firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
    sendResultInfoAsJson($retValue);
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
