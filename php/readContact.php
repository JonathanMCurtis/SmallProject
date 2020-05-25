<?php
  // Creates contact in the database

  // Gets the information provided in the file call
  $inputData = getRequestInfo();

  // Data to be inserted into database
  $ID = $inputData[ID];
  $FirstName = "";
  $LastName = "";
  $Email = "";
  $Phone = "";
  $CreationDate = "";
  $User = "";

  // Opens an SQL connection to the database using the credentials below
  $connection = new mysqli("localhost", "116751", "password", "116751");

  // If there is an error in the connection, returns a formatted error
  if($connection->connect_error)
  {
    returnWithError($connection->connect_error)
  }
  else
  {
      // Create an SQL statement to get data from contacts table from contact
      // with the provided ID/
      $sql = "SELECT ID,FirstName,LastName,Email,Phone,CreationDate,User
              FROM Contacts where ID=$inputData[ID]";

      $result = $connection->query($sql);

      if($result->num_rows > 0)
      {
        // Get the associated row with this result
        $row = result->fetch_assoc();

        // Assign values in the row to variables
        $FirstName = $row[FirstName];
        $LastName = $row[LastName];
        $Email = $row[Email];
        $Phone = $row[Phone];
        $CreationDate = $row[CreationDate];
        $User = $row[User];

        $connection->close();
        returnWithInfo($ID,$FirstName,$LastName,$Email,
                       $Phone,$CreationDate,$User);
      }
      else
      {
        // No result exists
        $connection->close();
        returnWithError("Contact does not exist");
      }

  }

  // Close the connection
  $connection->close();



  function returnWithError($error)
	{
		$retValue = '{"ID":"'. $ID .'","FirstName":"'. $FirstName .'",
                  "LastName":"'. $LastName .'","Email":"'. $Email .'",
                  "Phone":"'. $Phone .'","CreationDate":"'$CreationDate'",
                  "User":"'. $User .'", "error":"' . $error . '"}';
		sendResultInfoAsJson($retValue);
	}

	function sendResultInfoAsJson($obj)
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithInfo($ID,$FirstName,$LastName,$Email,
                          $Phone,$CreationDate,$User)
	{
		$retValue = '{"ID":"'. $ID .'","FirstName":"'. $FirstName .'",
                  "LastName":"'. $LastName .'","Email":"'. $Email .'",
                  "Phone":"'. $Phone .'","CreationDate":"'$CreationDate'",
                  "User":"'. $User .'", "error":""}';
		sendResultInfoAsJson($retValue);
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

 ?>
