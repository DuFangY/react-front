import React, { useState, useEffect, useContext, useRef } from 'react'
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { Button, message, Popconfirm, Descriptions } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import axios from 'axios';
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import moment from 'moment'
import Menu from '../../components/Menu'
import Avatar from '../../img/avatar.png'
export default function Single() {
  const [post, setPost] = useState({})
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const { id: postId } = useParams()
  useEffect(() => {
    nProgress.start()
    axios.get(`/posts/${postId}`).then(res => {
      setPost(res.data)
      nProgress.done()
    }).catch(err => {
      console.log(err.message)
      nProgress.done()
    })
  }, [postId])

  const confirm = () => {
    axios.delete(`/posts/${postId}`).then((res) => {
      message.success('博客删除成功');
      navigate('/')
    }).catch(err => {
      message.error(err.response.data)
    })
  };
  const cancel = () => {
    message.error('取消');
  };
  // const getText = (html)=>{
  //   const doc = new DOMParser().parseFromString(html,"text/html")
  //   return doc.body.textContent
  // }
  const myElementRef = useRef(null)
  // const [distanceRight,setDistanceRight] = useState({})
  // const resizePage = () => {
  //   const element = myElementRef.current;
  //   if (element) {
  //     const { top,left } = element.getBoundingClientRect();
  //     let elWidth = element.offsetWidth - 20
  //     setDistanceRight({top,left,elWidth})

  //   }
  // }
  // useEffect(() => {
  //   resizePage()
  //   window.addEventListener('resize', resizePage);
  //   return () => {
  //     window.removeEventListener('resize', resizePage);
  //   };
  // }, [])
  // const changeHeight = (value)=>{
  //   const element = myElementRef.current;
  //   element.style.height = `${value}px`
  // }
  return (
    <div className='single'>
      <div className="content">
        <div className="user">
          <img src={Avatar} alt="" />

          <div className="info">
            <span className='username'>{post.username}</span>
            <p className='publishTime'>{moment(post.date).format('YYYY-MM-DD HH:mm:ss')}</p>
          </div>
          {currentUser !== null && currentUser.username === post.username &&
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <Button shape="circle" icon={<EditTwoTone />} />
              </Link>
              <Popconfirm
                title="博客删除提醒"
                description="您确定要删除这篇博客吗"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button shape="circle" icon={<DeleteTwoTone />} ></Button>
              </Popconfirm>
              {/* <Button shape="circle" icon={<DeleteTwoTone />} /> */}
            </div>}

        </div>
        <Descriptions bordered style={{ textAlign: 'center'}}>
          <Descriptions.Item label="发布者" style={{ textAlign: 'center' }}>{post.username}</Descriptions.Item>
          <Descriptions.Item label="电子邮箱" style={{ textAlign: 'center' }}>{post.email}</Descriptions.Item>
          <Descriptions.Item label="文章类别" style={{ textAlign: 'center' }}>{post.cat}</Descriptions.Item>
          <Descriptions.Item label="浏览量" style={{ textAlign: 'center' }}>{post.watch}</Descriptions.Item>
          <Descriptions.Item label="文章标题" style={{ textAlign: 'center' }}>{post.title}</Descriptions.Item>
        </Descriptions>
        <h2 style={{ textAlign: 'center' }}>{post.title}</h2>
        <div className='blog'>
          <p dangerouslySetInnerHTML={{ __html: String(post.desc) }}></p>
        </div>

      </div>
      <div className='menuBox' ref={myElementRef}>
        <Menu cat={post.cat} postId={parseInt(postId)}/>
      </div>

    </div>
  )
}
