This file should document how to utilize the the API functions available to the front-end team. The should be in the following format

---------------------------------------------------
**API_Endpoint.php**
Input:
{
    "field1":"Information about what is expected.",
    "field2":"Information about what is expected."
}
---
Output:
{
    "field1":"Information about what is returned",
    "field2":"Information about what is returned"
}
---------------------------------------------------
**CreateUser.php**
Input:
{
  "User":"Desired username.",
  "Password":"Desired password.",
  "FirstName":"First name as provided.",
  "LastName":"Last name as provided."
}
---
Output:
{
  "id": "The ID granted to a new user, or 0 if there is an error.",
  "FirstName": "As provided.",
  "LastName": "As provided",
  "error": "Empty if successful, populated if an error occurs."
}
---------------------------------------------------
**Login.php**
Input:
{
  "User":"Provided username.",
  "Password":"Provided password."
}
---
Output:
{
  "id": "The ID associated with the user (if successful), or 0 if there is an error.",
  "FirstName": "The FirstName associated with the given account, or blank if error",
  "LastName": "The LastName associated with the given account, or blank if error",
  "error": "Empty if successful, populated if unsuccessful."
}
---------------------------------------------------
