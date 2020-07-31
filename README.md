
/* register API */

// Teachers can also be registered to multiple student

URL:- http://localhost:8080/api/register

Req :- {
     "teachers": "stu1@gmail.com",
     "students": ["teach@gmail.com"]          
}

Output:- {
    "students": [
        "teach@gmail.com"
    ],
    "_id": "5f22aa4d4c92386c1d503ea3",
    "teachers": "stu1@gmail.com",
    "createdAt": "2020-07-30T11:09:01.608Z",
    "updatedAt": "2020-07-30T11:09:01.608Z",
    "__v": 0
}


// student can also be registered to multiple Teachers

Req :- {
    "students": "stu@gmail.com",
    "teachers": [
        "teach1@gmail.com"
        "teach2@gmail.com"
        "teach3@gmail.com"
    ]          
}

output:- {
    _id:5f22a6c2fe812d5c7c5b3300
    teachers:[
        "teach1@gmail.com"
        "teach2@gmail.com"
        "teach3@gmail.com"
    ]
    students:"stu@gmail.com"
    createdAt:2020-07-30T10:53:54.459+00:00
    updatedAt:2020-07-30T10:58:51.027+00:00
    __v:0
} 

/* List of student */

// Retrieve a list of students common to a given list of teachers

URL:- http://localhost:8080/api/commonstudents?teachers=stu1@gmail.com&teachers=stu@gmail.com


output:- 
{
    "students": [
        "teach@gmail.com",
        "teach1@gmail.com",
        "teach2@gmail.com",
        "teach3@gmail.com"
    ]
}

URL:- http://localhost:8080/api/commonstudents?teachers=stu1@gmail.com

output:- 
{
    "students": [
        "teach@gmail.com"
    ]
}

/* Student suspend */

//  suspend a specified student

Req:- 
{
     "teachers": "stu1@gmail.com",
     "students": "teach@gmail.com"
}

outPut:-  
{
    "students": "teach@gmail.com"
}

/* notification api */

URL:- http://localhost:8080/api/retrievefornotifications

req:- {
  "teacher":  "teacherken@example.com",
  "notification": "Hello students! @studentagnes@example.com @studentmiche@example.com"
}

output:-
{
  "recipients":
    [
      "studentbob@example.com",
      "studentagnes@example.com", 
      "studentmiche@example.com"
    ]   
}