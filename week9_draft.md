
## Introduction

- Relational databases follow a schema, a detailed blueprint of how your tables work.

- NoSQL databases do not follow all the rules of a relational database —specifically, it does use a traditional row/column/table database design and does not use structured query language (SQL) to query data. **No stands for**, not only sql, it does not mean not sql. 

- There are four types of nosql-databases: (Document-based, Column-based, Graph-based, Examples of NoSQL databases)

- In this unit, we are going to be using  Cloud Firestore, a document-based no-sql database

## Setting up our database 

- Creating a database is simple. In your firebase project, select Database from the, left-hand-side, develop menu section

- Next, click the `Create database`

- We want to start off in test mode, so select this option


:::tip 

## Task 1 - Setting up a database

Follow the steps above to set up your database

:::


## Choose a data structure

- First let's consider what the data structure should look-like for the check-in form 
- Navigate to your app's check-in form using the side menu
- `Views/Checkin.js` - add an `onSubmit()` event handler to the CheckIn form:
      -    `<CheckinForm onSubmit={handleSubmit}/>`
   
      ```javaScript
          ... 
          const Checkin = props => {
                const handleSubmit = checkin => {
                    console.log(checkin);
                }
          ...
      ```
  - Submit the checkin form, and have a look at what the output is: 
  
  ```javaScript

    {
        exercise: 5
        veg: 3
        water: 2
        diet: 7
        comment: "test"
        total: 20
        drinkPen: "1"
        foodPen: "2"
    }

  ```

  - Nearly ready to send to the database, however, we need a few more bits of information. A username and profile picture is missing.

   - Let's grab that 
     - <Checkin   user={user} />
     - ```Checkin.propTypes = {user: PropTypes.object.isRequired};```
     - 
 - ```const ckin = {...checkin, ...{photo: user.photoURL, userId: userId.uid, useName: user.displayName || user.email}}
    
    console.log(ckin);```


## Task 2 - Setting up a database

Follow the steps above to construct your checkin object

:::


## Communicating with the firebase database

- `src/App.js` - `import "firebase/firestore";`

```javaScript 

import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function useAuth(fStore) {
  const ref = fStore.collection('checkins');

  const createCheckin  = checkin => ref.add(checkin);


  return {createCheckin}

}
export default useAuth;



```

-  <Checkin  createCheckin={createCheckin}  user={user} />

```javaScript

const Checkin = props => {
 
  const  {user, createCheckin} = props;
  console.log(user);

  const handleSubmit =  async checkin => {
    
    const ckin = {...checkin, ...{photo: user.photoURL, userId: user.uid, userName: user.displayName || user.email}}
    debugger;
   try {

     await  createCheckin(ckin);  
   } catch (error) {
       console.error("could not check in");
   }
  
  }

  return (
    <StyledTile>
      <StyledHeading> Log Your Progress For May 18 </StyledHeading>
      <CheckinForm onSubmit={handleSubmit}/>
    </StyledTile>
  );
};





```