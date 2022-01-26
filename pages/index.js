import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { getTimeline } from '../utils/timeline'
import { Box , Center, Divider,Textarea,Input, Fade, FormControl, FormLabel, Heading, Test, Button} from "@chakra-ui/react"
import { useForm } from 'react-form-hooks'

export default function Home() {

  const [gender,setGender] = useState('')
  const [age,setAge] = useState('')
  const [career,setCareer] = useState('')
  const [Desc , setDesc] = useState([])
  const [DateTime , setDateTime] = useState([])
  
  const submitData = () => {
    string:UserData = age+'_';
    if(gender == 'หญิง')
    {
      UserData += 'F'
    }
    else
    {
      UserData += 'M'
    }
    UserData += '_'+career.replace(' ','_')
    console.log(UserData)
    try{
      firebase
        .firestore()
        .collection('Timeline')
        .doc(String(UserData))
        .set({
          
        })
    }
    catch (err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getTimeline();
  },[]);
  return (
    <div id='main' className='row'>
    <div className='Headcolumn'>
      <h1 className='header'>COVID Timeline Generator</h1>
    </div>
    
    {/* Personal Info */}
    <div class="split left">
  <div class="centered">
    <form className='Personal-Info-Box'>
    <h3> &nbsp;ข้อมูลผู้ป่วย</h3>
    <FormControl className='Personal-Form'>
      <FormLabel claseName= 'Gender'htmlFor='Gender'>เพศ
      <Input type="text" onChange={(e) => setGender(e.target.value)}
      ></Input>
      </FormLabel>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <FormLabel claseName= 'Age' htmlFor='Age'>อายุ
      <Input type="number" onChange={(e) => setAge(e.target.value)}
      ></Input>
      </FormLabel>
    </FormControl>
    <FormControl className='Personal-Form'>
    <FormLabel claseName= 'Career' htmlFor='Career'>อาชีพ
      <Input className='Career-Input' type="text" onChange={(e) => setCareer(e.target.value)}
      ></Input>
      </FormLabel>
    </FormControl>
    
    
    </form>

    <form className='Personal-Info-Box'>
    <h3> &nbsp;รายละเอียด</h3>
    <FormControl className='Personal-Form'>
      <FormLabel claseName= 'DateTime'htmlFor='DateTime'>วันที่และเวลา
      <Input className='DateTime-Input' type="datetime-local" onChange={(e) => setDateTime(e.target.value)}
      ></Input>
      </FormLabel>
     
    </FormControl>
    <FormControl className='Personal-Form'>
    <FormLabel claseName= 'Career' htmlFor='Career'>รายละเอียด
      <Textarea className='Desc-Input' type="text-area" onChange={(e) => setDesc(e.target.value)}
      ></Textarea>
      </FormLabel>
    </FormControl>
    <Button className='Submit' onClick={console.log(DateTime)}>+ เพิ่มข้อมูล</Button>
    </form>
  </div>
</div>

<div class="split right">
  <div class="centered">
    <div className='Timeline'></div>
  </div>
</div>
    
  </div>
  )
}
