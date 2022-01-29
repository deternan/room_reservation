## login

##### Innolux LDAP

---

`POST` /room_reservation/login
 

	{	
		"name": String,
		"password": String
	}


###### Response

Code: 200

	{	
		"id": Int,
  		"user_id": String, 
  		"user_name" : String,
		"response": String
	}

sample: 

	{	
		"id": {uuid},
  		"user_id": "21011047", 
  		"user_name" : "王小明",
		"response": "login success"
	}


Code: 401

	{			
  		"response": "Fail account or password"
	}


## logout

---

`GET` /room_reservation/logout
 


###### Response

Code: 200

	{	
		"response": "logout successful"
	}


## Room list
#### Admin
`GET` /room_reservation/index

###### Response

	{	
		"room_list": {
			room_id:[{
				"room_name": String,
				"room_department_code": Int,
				"room_department": String
			}]
		}
	}


sample: 

	{	
		"room_list": {
			"0":[{
				"room_name": "第四會議室",
				"room_department_code": 1,
				"room_department": "智能推進處"
			}]
		}
	}



## Reserved room view

#### Admin

`GET` /room_reservation/{room_id}



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



Code: 401

	{	
		"response": "Permission denied"
	}



#### User

`GET` /room_reservation/{room_id}



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


## Reservation (add)
#### Admin
`POST` /admin/room_reservation/reservation/add

	{			
		"type": "reservation",
		"room_id": Int,
		"meeting_name": String,
		"borrower_id": String,
		"borrower": String,
		"borrower_department_code": String,
		"begin_time": DateTime,
		"eng_time": DateTime,
		"create_time": DateTime,
		"last_update_time: DateTime,
	}

###### Response
Code: 201

	{	
		"room_id": Int,
		"response": Boolean
	}

sample:

	{	
		"room_id": 1,
		"response": true
	}


Code: 405

	{	
		"room_id": Int,
		"response": Boolean
	}


#### User
`POST` /user/room_reservation/reservation/add

	{			
		"type": "reservation",
		"room_id": Int,
		"meeting_name": String,
		"borrower_id": String,
		"borrower": String,
		"borrower_department_code": String,
		"begin_time": DateTime,
		"eng_time": DateTime,
		"create_time": DateTime,
		"last_update_time: DateTime,	
	}


###### Response
Code: 201

	{	
		"room_id": Int,
		"response": Boolean
	}


Code: 405

	{	
		"room_id": Int,
		"response": Boolean
	}


## Reservation (delete)
#### Admin
`POST` /admin/room_reservation/reservation/delete


#### User
`POST` /user/room_reservation/reservation/delete


## Reservation (edit)
#### Admin
`POST` /admin/room_reservation/reservation/edit


#### User
`POST` /user/room_reservation/reservation/edit



---
Last updated: January 29, 2022 11:40 PM