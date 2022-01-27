import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { Box, Center, Divider, Textarea, Input, Fade, FormControl, FormLabel, Heading, Test, Button } from "@chakra-ui/react"
import { useForm } from 'react-hook-form'
import { firestore } from '../utils/firebase'



export default function Home() {

  const { register, handleSubmit, errors } = useForm();
  const [Desc, setDesc] = useState([])
  const [DateTime, setDateTime] = useState([])
  const [Age, setAge] = useState('')
  const [Gender, setGender] = useState('')
  const [Career, setCareer] = useState('')
  var UserData = '';

  const onSubmit = (data) => {
    //console.log(data)
    UserData = data.Age + '_';
    if (data.Gender == 'หญิง') {
      UserData += 'F'
    }
    else {
      UserData += 'M'
    }
    UserData += '_' + data.Career.replace(' ', '_')
    //console.log(UserData)
    try {
      firestore
        .collection('Timeline')
        .doc(String(UserData))
        .set({
          เพศ: data.Gender,
          อายุ: data.Age,
          อาชีพ: data.Career
        }).then(updateDesc(UserData, data))
    }
    catch (err) {
      console.log(err);
    }
  }
  const updateDesc = (UserData, data) => {
    var DateTimeLog = String(data.DateTime).replaceAll('-', '').replaceAll('T', '_').replaceAll(':', '')
    //console.log(DateTimeLog)
    //console.log(UserData)
    try {
      firestore
        .collection('Timeline')
        .doc(String(UserData))
        .collection('UserTimeline')
        .doc(String(DateTimeLog))
        .set({
          DateTime: data.DateTime,
          Desc: data.Desc
        }).then(getTimeline(UserData)).then(getUserDetail(UserData)).then(getDateTime(UserData))
    }
    catch (err) {
      console.log(err);
    }
  }

  const getTimeline = (UserData) => {

    firestore.collection('Timeline').doc(String(UserData)).collection('UserTimeline').onSnapshot(
      snapshot => {
        snapshot.docs.map(doc =>
          setDesc(doc.data().Desc)
        )
      }
    );
  };
  const getDateTime = (UserData) => {

    firestore.collection('Timeline').doc(String(UserData)).collection('UserTimeline').onSnapshot(
      snapshot => {
        snapshot.docs.map(doc =>
          setDateTime(doc.data().DateTime)
        )
      }
    );
  };

  const getUserDetail = async (UserData) => {
    const User = await firestore.collection('Timeline').doc(String(UserData)).get()
    //console.log(User.data().อายุ)
    setAge(User.data().อายุ)
    setGender(User.data().เพศ)
    setCareer(User.data().อาชีพ)
    //console.log(Age+' '+Gender+' '+Career)
  }

  return (
    <div id='main' className='row'>
      <div className='Headcolumn'>
        <h1 className='header'>COVID Timeline Generator</h1>
      </div>
      {/* Personal Info */}
      <div className="split left">
        <div className="centered">
          <form className='Form-data' onSubmit={handleSubmit(onSubmit)}>
            <div className='Top-Box'>
              <h3>ข้อมูลผู้ป่วย</h3>
              <div className='Top-data'>
                <div className='Top-row'>
                  <div>
                    <label>เพศ</label>
                    <select {...register('Gender')}>
                      <option value='ชาย'>ชาย</option>
                      <option value='หญิง'>หญิง</option>
                    </select>
                  </div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <div>
                    <label>อายุ</label>
                    <input type='number' {...register('Age')}></input>
                  </div>
                </div>
                <div className='Bottom-row'>
                  <div>
                    <label >อาชีพ</label>
                    <input type='text' className='Career-Input' {...register('Career')}></input>
                  </div>
                </div>
              </div>
            </div>
            <div className='blank-space'></div>
            <div className='Bottom-Box'>
              <h3>รายละเอียด</h3>
              <div className='Bottom-data'>
                <div className='Bottom-row'>
                  <div>
                    <label>วันที่และเวลา</label>
                    <input className='DateTime-Input' type='datetime-local'  {...register('DateTime')}></input>
                  </div>
                </div>
                <div className='Bottom-row'>
                  <div>
                    <label >รายละเอียด</label>
                    <textarea className='Desc-Input' {...register('Desc')}></textarea>
                  </div>
                </div>
                <button className='submit' type='submit'>+ เพิ่มข้อมูล</button>
              </div>

            </div>

          </form>
        </div>
      </div>

      <div className="split right">

        <div className="output-Box">
          <div className='Timeline'>
          {Gender != '' ? (
              <h1>Timeline</h1>) : (<div></div>)}
            {Gender != '' ? (
              <div className='Patient-detail'>ผู้ป่วย{Gender} อายุ {Age} ปี
                <div className='Patient-Career'>
                  อาชีพ {Career}
                </div>
              </div>) : (<div></div>)}
            <div className='Timeline-Output'></div>
          </div>
        </div>
      </div>
    </div>
  )
}
