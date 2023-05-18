
import React, { useEffect,useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment'
import {  Upload, message} from 'antd'
import ImgCrop from 'antd-img-crop';
export default function Write() {
  const state = useLocation().state
  const [value, setValue] = useState(state?.desc || '');
  const [title, setTitle] = useState(state?.title || '');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || '');
  const navigate = useNavigate()
  const upLoad = async () => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await axios.post('/upload', formData)
      return res.data
    }
    catch (err) {
      // console.log(err)
    }
  }

  const handleClick = async () => {


    if (cat === '')
      message.error('请选择发布文章的类别!')
    else {
      let imgUrl = await upLoad()
      state ? axios.put(`/posts/${state.id}`, {
        title:title?title:'no title',
        desc: value,
        cat,
        img: file ? imgUrl : state.img,
      }).then(() => {
        message.success('博客更新成功')
        navigate('/')
      }).catch(err => {
        message.error(err.response.data)
      }) :
        axios.post(`/posts`, {
          title:title?title:'no title',
          desc: value,
          cat,
          img: file ? imgUrl : 'logo.png',
          date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        }).then(() => {
          message.success('博客发布成功')
          navigate('/')
        }).catch(err => {
          message.error(err.response.data)
        })
    }

  }

  const [fileList, setFileList] = useState([
    {
      url: '/upload/logo.png',
    },
  ]);
  useEffect(()=>{
    if(state)
      setFileList([{url:`/upload/${state.img}`}])
  },[state])
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if(newFileList.length === 0) //覆盖之前上传的内容
      setFile(null)
  };
  const changeFile=(F)=>{
    setFile(F)
    return false
  }

  // const handleImageUpload = (file) => {
  //   // 上传图片并返回图片链接的逻辑
  //   const formData = new FormData()
  //   formData.append('file', file)
  //   const res =  axios.post('/upload', formData)
  //   return res
  // }

  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean'],
      ],
    },
    keyboard: {
      spaceHandler: false
    }
  };

  return (
    <div className='add'>
      <div className="content">
        <input type="text" value={title} placeholder='title' onChange={e => setTitle(e.target.value)} />
        <div className="editorContainer">
          <ReactQuill
            className='editor'
            modules={modules}
            placeholder='Compose an epic...'
            theme="snow"
            value={value}
            onChange={setValue} 
            />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status:</b> {state?'Published':'Draft'}
          </span>
          {/* <input style={{ display: 'none' }} type="file" id="file"
            onChange={e => setFile(e.target.files[0])}
          /> */}
          {/* <label htmlFor="file" className='file'>Upload files</label> */}
          <ImgCrop rotationSlider>
            <Upload
              beforeUpload = {changeFile}
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
            >
              {fileList.length < 1 && '+ Upload'}
            </Upload>
          </ImgCrop>
          <div className="buttons">
            <button>图片上传</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <label htmlFor="JavaScript" className='change'>
            <input type="radio" checked={cat === 'JavaScript'} name="cat" value='JavaScript' id="JavaScript" onChange={(e) => { setCat(e.target.value) }} />
            <span>JavaScript</span>
          </label>

          <label htmlFor="React" className='change'>
            <input type="radio" checked={cat === 'React'} name="cat" value='React' id="React" onChange={(e) => { setCat(e.target.value) }} />
            <span>React</span>
          </label>

          <label htmlFor="Vue" className='change'>
            <input type="radio" checked={cat === 'Vue'} name="cat" value='Vue' id="Vue" onChange={(e) => { setCat(e.target.value) }} />
            <span>Vue</span>
          </label>

          <label htmlFor="TypeScript" className='change'>
            <input type="radio" checked={cat === 'TypeScript'} name="cat" value='TypeScript' id="TypeScript" onChange={(e) => { setCat(e.target.value) }} />
            <span>TypeScript</span>
          </label>

          <label htmlFor="NodeJs" className='change'>
            <input type="radio" checked={cat === 'NodeJs'} name="cat" value='NodeJs' id="NodeJs" onChange={(e) => { setCat(e.target.value) }} />
            <span>NodeJs</span>
          </label>

          <label htmlFor="Other-About-Web" className='change'>
            <input type="radio" checked={cat === 'Other-About-Web'} name="cat" value='Other-About-Web' id="Other-About-Web" onChange={(e) => { setCat(e.target.value) }} />
            <span>Other-About-Web</span>
          </label>
        </div>
      </div>
      
    </div>
  )
}
