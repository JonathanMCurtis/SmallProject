<?php
  // Updates contact in the database

  // Gets the information provided in the file call
  $inputData = getRequestInfo();

  // Data to be inserted into database
  $ID = $inputData[id];
  $FirstName = $inputData[firstName];
  $LastName = $inputData[lastName];
  $Email = $inputData[email];
  $Phone = $inputData[phone];
  $CreationDate = date(d-m-Y);
  $User = $inputData[user];

  // Opens an SQL connection to the database using the credentials below
  $connection = new mysqli("localhost", "116751", "password", "116751");

  // If there is an error in the connection, returns a formatted error
  if($connection->connect_error)
  {
    returnWithError($connection->connect_error)
  }
  else
  {
    $sql = "SELECT ID FROM Contacts where ID = " . $inputData[ID];

    $result = $connection->query($sql);

    if($result->num_rows > 0)
    {

      // Create an SQL statement to insert the provided data into the contacts
      // table.
      $sql = "UPDATE contacts SET FirstName = " . $FirstName . ", LastName = " . $LastName . ", Email = " . $Email . ", Phone = " . $Phone . ", CreationDate = " . $CreationDate . ", User = " . $User . " WHERE ID = " . $ID;

      $connection->query($sql);
    }

    else
    {
      returnWithError("This contact does not exist.")
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
