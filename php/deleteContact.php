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
    $sql = "DELETE Contacts WHERE ID = " . $ID;

    $connection->query($sql);
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
