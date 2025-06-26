const getalltodo=async()=>{
    const res=await axios.get("http://localhost:4000/all-todos")
    console.log(res.data)
}

getalltodo()