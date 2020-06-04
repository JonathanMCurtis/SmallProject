<?php
    function getRequestInfo($obj)
    {
        return json_decode($obj, true);
    }

    function returnWithError($errorID, $error, $missingFieldsArray=null)
    {
        $statusCode = ($errorID == 409 || $errorID == 204) ? 200 : $errorID;

        $output = array();
        $output["ErrorID"] = $errorID;
        $output["Error"] = $error;
        if ($missingFieldsArray != null)
            $output["Missing"] = $missingFieldsArray;

        outputAsJSON($statusCode, $output);
    }

    function returnWithInfo($outputArray)
    {
        $outputArray["ErrorID"] = 0;
        $outputArray["Error"] = "";
        outputAsJSON(200, $outputArray);
    }

    function returnWithList($SQLresult, $contactIndex=false)
    {
        $retValue = array();
        if ($contactIndex)
        {
            while ($row = mysqli_fetch_assoc($SQLresult))
            {
                $new = array("FirstName"=>$row["FirstName"],
                             "LastName"=>$row["LastName"],
                             "Email"=>$row["Email"],
                             "Phone"=>$row["Phone"],
                             "CreationDate"=>$row["CreationDate"]);
                $retValue[$row["ContactID"]] = $new;
            }
        }
        else
        {
            while ($row = mysqli_fetch_assoc($SQLresult))
            {
                $retValue[] = $row;
            }
        }
        outputAsJSON(200,  $retValue);
    }

    function outputAsJSON($statusCode, $obj)
    {
        $responseMsg = getResponseMessage($statusCode);
        header('HTTP/1.1 ' . $statusCode . ' ' . $responseMsg);
        header('Content-type: application/json');
        echo json_encode($obj);
    }

    function getResponseMessage($code)
    {
        if ($code == 200) {
            return 'OK';
        } else if ($code == 400) {
            return 'BAD REQUEST';
        } else if ($code == 401) {
            return 'UNAUTHORIZED';
        } else if ($code == 409) {
            return 'CONFLICT';
        } if ($code == 500) {
            return 'INTERNAL SERVER ERROR';
        } else if ($code == 501) {
            return 'NOT IMPLEMENTED';
        } else if ($code == 503) {
            return 'SERVICE UNAVAILABLE';
        }

    }

    function ensureProps($inputData, $required)
    {
        $missingProps = array();
        foreach ($required as $prop)
        {
            if (!array_key_exists($prop, $inputData))
                $missingProps[] = $prop;
        }
        if (count($missingProps)==0) {
            return true;
        }
        else
        {
            returnWithError(400, "The following (".count($missingProps).") required fields are missing from your request: ", $missingProps);
            return false;
        }
    }
