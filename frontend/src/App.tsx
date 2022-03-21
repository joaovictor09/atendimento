import { useEffect, useState } from 'react'
import { api } from './service/api'



function App() {
  const [attendances, setAttendances] = useState([{"name": "test", "last_attendance": "9 de março", "attendanceType": false}])
  
  async function fetchAttendances() {
    await api.get(
      '/clients/6a8c653c-bebe-4631-a3f7-51af86114273'
    ).then( async(res) => {
      console.log(res.data)
      setAttendances(res.data)
      return
    })
    .catch((err)=> {
      console.log(err)
      return
    })

  }

  useEffect(() => {
    fetchAttendances() 
  }, [])

  return (
    attendances.map((attendance, key) => {
      return(
        <div key={key}>
          <h1>{attendance.name}</h1>
          <span>{attendance.last_attendance}</span> <br/>
          <span>{`${attendance.attendanceType}`}</span>
        </div>
      )
    })
  )
}

export default App
