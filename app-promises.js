const users = [{
    id:1,
    name: 'Stan',
    schoolId: 101
},
{
    id:2,
    name: 'Bob',
    schoolId: 999
}];

const grades = [{
    id: 1,
    schoolId: 101,
    grade: 99
},
{
    id: 2,
    schoolId: 999,
    grade: 88
},
{
    id: 3,
    schoolId: 101,
    grade: 40
}];

const getUser = (id)=>{
    return new Promise((resolve,  reject)=>{
        const user = users.find((user) => user.id === id);

        if(user){
            resolve(user);
        }else{
            reject(`Unable to find user with id of ${id}.`);
        }
    });   
};

const getGrades = (schoolId) =>{
    return new Promise((resolve, reject)=>{
        resolve(grades.filter((grade)=>grade.schoolId === schoolId));
    })
};

const getStatus = (userId)=>{
    let user;//workaround
    return getUser(userId).then((tempUser)=>{
        user = tempUser;
        return getGrades(user.schoolId);
    }).then((grades)=>{
        let average = 0;//let is another version of var
        if(grades.length > 0){
            average = grades.map((grade)=>grade.grade).reduce((a, b)=> a + b) / grades.length;
        }

        return `${user.name} has a ${average}% average in the class`;
        //console.log(average);
        //average
        //return our string
    });
};

// async await_______________________

const getStatusAlt = async (userId)=>{
    const user = await getUser(userId);
    const grades = await getGrades(user.schoolId);       
    let average = 0;//let is another version of var
    if(grades.length > 0){
        average = grades.map((grade)=>grade.grade).reduce((a, b)=> a + b) / grades.length;
    }

    return `${user.name} has a ${average}% average in the class`;
};
//______________________________________
getStatusAlt(1).then((status)=>{
    console.log(status);
}).catch((e)=>{
    console.log(e);
});
//______________________________________

// getUser(1).then((user)=>{
//     console.log(user);
// }).catch((e)=>{
//     console.log(e);
// });

// getGrades(101).then((grades)=>{
//     console.log(grades);
// }).catch((e)=>{
//     console.log(e);
// });

// getStatus(1).then((status)=>{
//     console.log(status);
// }).catch((e)=>{
//     console.log(e);
// });