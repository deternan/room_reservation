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
		"borrower_id": String,
		"data_type": String
	}


###### Response
Code: 200

	{	
		"reservation":{
			room_id:[{
				"room_name": String,
				"room_department_code": Int,
				"room_department": String,				
				"meeting_name": String,
				"borrower_id": String,
				"borrower": String,
				"borrower_department_code": String,
				"begin_time": DateTime,
				"eng_time": DateTime				 
			}]
		}
	}


sample: (每日為單位)


sample: (每週為單位)

	{	
		"reservation":{
			"0":[{
				"room_name": "第四研究室",
				"room_department_code": Int,
				"room_department": "智能推進處",
				"meeting_name": "籌碼庫討論",
				"borrower_id": "21011047",
				"borrower": "柯兆軒",
				"borrower_department_code": "智能推進處",
				"begin_time": 2022-01-14 10:00:00.0000,
				"eng_time": 2022-01-14 11:00:00.0000
			}],
			"1":[{
				"room_name": "第四研究室",
				"room_department_code": 0,
				"room_department": "智能推進處",
				"meeting_name": "idd處週會",
				"borrower_id": "21011047",
				"borrower": "柯兆軒",
				"borrower_department_code": "智能推進處",
				"begin_time": 2022-01-14 13:30:00.0000,
				"eng_time": 2022-01-14 15:00:00.0000
			}]
		}
	}


sample: (每月為單位)

	{	
		<TBD>
	}

Code: 401

	{	
		"response": "Permission denied"
	}



#### User

`GET` /room_reservation

	{			
		"type": "view",
		"borrower_id": String
	}

###### Response
Code: 200

	{	
		"reservation":{
			room_id:[{
				"room_name": String,
				"room_department_code": Int,
				"room_department": String,				
				"meeting_name": String,
				"borrower_id": String,
				"borrower": String,
				"borrower_department_code": String,
				"begin_time": DateTime,
				"eng_time": DateTime				 
			}]
		}
	}

Code: 401

	{	
		"response": "Permission denied"
	}


## Reservation
#### Admin
`GET` /room_reservation/reserved

	{			
		"type": "reserved",
		"room_id": Int,
		"room_department_code": Int,
		"borrower_id": String,
		"begin_time": DateTime,
		"eng_time": DateTime		
	}

###### Response
Code: 201

	{	
		<TBD>
	}


#### User
`GET` /room_reservation/reserved

	{			
		"type": "reserved",
		"room_id": Int,
		"room_department_code": Int,
		"beginTime": DateTime,
		"engTime": DateTime,
		"borrowerId": String		
	}


###### Response



---
Last updated: January 22, 2022 11:30 PM