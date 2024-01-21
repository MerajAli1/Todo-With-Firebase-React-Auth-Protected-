import { Box, Button, TextField, Typography } from '@mui/material'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase'
import Loader from '../Loader/Loader'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Todo = () => {
  const [todos, setTodos] = useState("")
  const [refresh, setRefresh] = useState(false)
  const [allTodos, setAllTodos] = useState([])
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  //Add data Function
  const addData = async (e) => {
    e.preventDefault()
    if (!todos) {
      toast.error('Fill out fields', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      try {
        const userObj = {
          todos: todos
        }
        const docRef = await addDoc(collection(db, "AllTodos"), userObj);
        console.log("Document written with ID: ", docRef.id, docRef);
        toast.success('Added', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
        });
        setTodos("")
      } catch (e) {
        console.error("Error adding document: ", e);
        toast.error('Error ' + e, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
        });
      }
    }

  }
  //Get data Function
  const getData = async () => {
    try {
      const arr = []
      const docSnap = await getDocs(collection(db, 'AllTodos'))
      docSnap.forEach((doc) => {
        arr.push({
          ...doc.data(),
          id: doc.id
        })
      })

      setAllTodos([...arr])
      setRefresh(!refresh)

    }
    catch (error) {
      console.log(error)
    }

  }

  //Remove data Function
  const removeData = async (id) => {
    setLoading(true)
    await deleteDoc(doc(db, "AllTodos", id));
    toast.error('Deleted', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: Bounce,
    });
    setLoading(false)
  }
  //Update data Function
  const updateData = async (id) => {
    console.log(id)
    setLoading(true)
    try {
      const editValue = prompt("Enter Value")
      if (editValue === '') {
        alert("Enter Value")
      }
      else {
        const userObj = {
          todos: editValue
        }
        await updateDoc(doc(db, "AllTodos", id), userObj)
        toast.info('Updated', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
        });
      }

    } catch (error) {
      console.log(error)
    }
    setLoading(false)
    setRefresh(!refresh)
  }

  useEffect(() => {
    getData()
  }, [refresh])



  return (
    <>
      <Button
        color='error'
        variant='contained'
        onClick={() => {
          localStorage.clear();
          toast.success('Logged out', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
          });
          navigate("/");
        }}
      >
        LOGOUT
      </Button>
      <Typography variant='h3' sx={{ textAlign: "center", marginTop: "50px", marginBottom: "20px" }}>TODO LIST</Typography>
      <Box>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 7 }}>
          <TextField onChange={(e) => setTodos(e.target.value)} id="outlined-basic" label="Enter Todo" variant="outlined" />
          <Button onClick={addData} sx={{ background: "#023e8a" }} variant='contained'>Add</Button>
        </div>
      </Box>
      {loading ? <Loader /> :
        <Box>
          <div style={{ width: "100%", display: "flex", justifyContent: "center", flexFlow: "wrap" }}>
            {
              allTodos?.map((e, i) => {
                return (
                  <div key={i} style={{
                    listStyle: "none",
                    background: "#023e8a",
                    color: "white",
                    borderRadius: 10,
                    boxShadow: "5px 5px 30px black",
                    padding: 18,
                    width: "50%",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    marginTop: 20,
                  }}>
                    <p style={{ textAlign: "center", fontSize: "1.7rem" }}>{e.todos}</p>
                    <Button onClick={() => updateData(e.id)} color='success' variant='contained'>Update</Button>
                    <Button onClick={() => removeData(e.id)} color="error" style={{ marginTop: 10 }} variant='contained'>Remove</Button>
                  </div>)
              })
            }
          </div>
        </Box>}
    </>
  )
}

export default Todo