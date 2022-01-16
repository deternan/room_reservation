## login

#######Innolux LDAP

---

`GET` /room_reservation/login
 

	{	
		"name": String,
		"password": String
	}


###### Response

Code: 200

	{	
		"id": Int,
  		"user_id": String, 
  		"user_name" : String
	}

Code: 401

	{			
  		"response": "Fail account or password"
	}



## Room view
#### Admin

`GET` /room_reservation

	{			
		"type": "view",
		"borrowerId": String		
	}


###### Response
Code: 200

	{	
		"reservation":{
			room_id:[{
				"room_name": String,
				"roomDepartmentId": Int,
				"roomDepartment": String,				
				"meeting_name": String,
				"borrowerId": String,
				"borrower": String,
				"borrowerDepartment": String,
				"beginTime": DateTime,
				"engTime": DateTime				 
			}]
		}
	}

sample: (每週為單位)

	{	
		"reservation":{
			"0":[{
				"room_name": "第四研究室",
				"roomDepartmentId": 0,
				"roomDepartment": "智能推進處",
				"meeting_name": "籌碼庫討論",
				"borrowerId": "21011047",
				"borrower": "柯兆軒",
				"borrowerDepartment": "智能推進處",
				"beginTime": 2022-01-14 10:00:00.0000,
				"engTime": 2022-01-14 11:00:00.0000
			}],
			"1":[{
				"room_name": "第四研究室",
				"roomDepartmentId": 0,
				"roomDepartment": "智能推進處",
				"meeting_name": "idd處週會",
				"borrowerId": "21011047",
				"borrower": "柯兆軒",
				"borrowerDepartment": "智能推進處",
				"beginTime": 2022-01-14 13:30:00.0000,
				"engTime": 2022-01-14 15:00:00.0000
			}]
		}
	}


Code: 401

	{	
		"response": "Permission denied"
	}



#### User


`GET` /room_reservation

	{			
		"type": "view",
		"borrowerId": String
	}

###### Response
Code: 200

	{	
		<TBD>
	}

Code: 401

	{	
		<TBD>
	}


## Reservation
#### Admin
`GET` /room_reservation/reserved

	{			
		"type": "reserved",
		"roomId": Int,
		"roomDepartment": Int,
		"beginTime": DateTime,
		"engTime": DateTime,
		"borrowerId": String		
	}

#### User
`GET` /room_reservation/reserved

	{			
		"type": "reserved",
		"roomId": Int,
		"roomDepartment": Int,
		"beginTime": DateTime,
		"engTime": DateTime,
		"borrowerId": String		
	}