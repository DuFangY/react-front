import React, { useState, useEffect, useContext, useRef } from 'react'
import { EditTwoTone, DeleteTwoTone, FrownTwoTone, MehTwoTone, SmileTwoTone } from '@ant-design/icons';
import { Button, message, Popconfirm, Descriptions, Card } from 'antd';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import axios from 'axios';
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import moment from 'moment'
import Menu from '../../components/Menu'
import Avatar from '../../img/avatar.png'

export default function Single() {
  const [post, setPost] = useState({})
  const [newpost, setNewpost] = useState([])
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
  const fixedElement = useRef(null)
  const blogElement = useRef(null)

  const scroolSlip = () => {
    const element = myElementRef.current;
    if (element) {
      const { top } = element.getBoundingClientRect();
      let elHeight = element.offsetHeight
      let elWidth = element.offsetWidth
      if (Math.abs(top) >= elHeight) {
        const fixed = fixedElement.current
        fixed.style.position = 'fixed'
        fixed.style.top = '90px'
        fixed.style.width = elWidth + 'px'
      }
      if (Math.abs(top) < elHeight) {
        const fixed = fixedElement.current
        fixed.style.position = 'static'
        fixed.style.width = '100%'
      }
    }
  }

  //使用鼠标滚动fixed定位右边栏
  useEffect(() => {
    scroolSlip()
    window.addEventListener('scroll', scroolSlip);
    return () => {
      window.removeEventListener('scroll', scroolSlip);
    };
  }, [])
  //按照时间顺序排序
  useEffect(() => {
    axios.get(`/posts/rank`).then(res => {
      nProgress.done()
      if (res.data.length > 5)
        res.data = res.data.slice(0, 5)
      setNewpost([...res.data])
      // console.log(res.data)
    })
  }, [])

  const goHome = () => {
    navigate('/')
  }

  const nonoRE = () => {
    const rec = localStorage.getItem("recommend")
    if (rec)
      message.info('您已经选择过了')
    else {
      localStorage.setItem("recommend", -1)
      message.success('您的推荐是对我们最大的回馈！')
    }

  }
  const noRe = () => {
    const rec = localStorage.getItem("recommend")
    if (rec)
      message.info('您已经选择过了')
    else {
      localStorage.setItem("recommend", 0)
      message.success('您的推荐是对我们最大的回馈！')
    }

  }
  const Re = () => {
    const rec = localStorage.getItem("recommend")
    if (rec)
      message.info('您已经选择过了')
    else {
      localStorage.setItem("recommend", 1)
      message.success('您的推荐是对我们最大的回馈！')
    }

  }
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
          <Descriptions bordered style={{ textAlign: 'center' }}>
            <Descriptions.Item label="发布者" style={{ textAlign: 'center' }}>{post.username}</Descriptions.Item>
            <Descriptions.Item label="电子邮箱" style={{ textAlign: 'center' }}>{post.email}</Descriptions.Item>
            <Descriptions.Item label="文章类别" style={{ textAlign: 'center' }}>{post.cat}</Descriptions.Item>
            <Descriptions.Item label="浏览量" style={{ textAlign: 'center' }}>{post.watch}</Descriptions.Item>
            <Descriptions.Item label="文章标题" style={{ textAlign: 'center' }}>{post.title}</Descriptions.Item>
          </Descriptions>
          <h2 style={{ textAlign: 'center' }}>{post.title}</h2>
          <div className='blog' ref={blogElement}>
            <p dangerouslySetInnerHTML={{ __html: String(post.desc) }}></p>
          </div>

        </div>
        <div className='menuBox'>
          <Menu cat={post.cat} postId={parseInt(postId)} ref={myElementRef} />
          <div className='slideInfo' ref={fixedElement}>
            <Card
              title="最新文章"
              extra={<button onClick={goHome}
                style={{ color: 'black', background: 'none', border: 'none', cursor: 'pointer', verticalAlign: 'middle' }}
              >&nbsp;More</button>}
              style={{
                width: '100%',
              }}
            >
              {
                newpost.map(val =>
                  <div key={val.id}>
                    <NavLink to={`/post/${val.id}`}>{val.title}</NavLink>
                    <br />
                    <br />
                  </div>

                )
              }
            </Card>
            <Card
              title="你愿意向朋友推荐此博客系统吗？"
              style={{
                width: '100%',
                marginTop: "30px"
              }}
            >
              <div className="recommendBox">
                <div className='recommend'>
                  <Button shape="circle" style={{ border: "none" }} icon={<FrownTwoTone style={{ fontSize: "30px" }}
                    onClick={nonoRE}
                  />}></Button>
                  <span>强烈不推荐</span>
                </div>
                <div className='recommend'>
                  <Button shape="circle" style={{ border: "none" }} icon={<MehTwoTone style={{ fontSize: "30px" }}
                    onClick={noRe}
                  />}></Button>
                  <span>不推荐</span>
                </div>
                <div className='recommend'>
                  <Button shape="circle" style={{ border: "none" }} icon={<SmileTwoTone style={{ fontSize: "30px", color: "gray" }}
                    onClick={Re}
                  />}></Button>
                  <span>推荐</span>
                </div>
              </div>

            </Card>
          </div>
        </div>

      </div>

  )
}
