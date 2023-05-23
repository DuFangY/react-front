import React, { useEffect, useState, useContext, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { Button, Result, Card, Avatar, Drawer, Modal, Image } from 'antd';
import { AppstoreAddOutlined, PieChartOutlined } from '@ant-design/icons'
import * as Echarts from 'echarts'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { AuthContext } from '../../context/authContext'
import avatar from '../../img/avatar.png'

var pieMyChart = ''
const { Meta } = Card;
export default function Home() {
  const [posts, setPosts] = useState([])
  const cat = useLocation().search
  const { currentUser } = useContext(AuthContext)
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myList, setMyList] = useState([])
  const picRef = useRef(null)
  useEffect(() => {
    nProgress.start()
    axios.get(`/posts${cat || ''}`).then(res => {
      setPosts(res.data)
      nProgress.done()
    }).catch(err => {
      console.log(err.message)
      nProgress.done()
    })
  }, [cat])
  useEffect(() => {
    axios.get('/analyse/blog').then(res => {
      setMyList(res.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  const picView = () => {
    if (pieMyChart !== null && pieMyChart !== "" && pieMyChart !== undefined) {
      pieMyChart.dispose();//解决echarts dom已经加载的报错
    }
    pieMyChart = Echarts.init(picRef.current);
    var option;

    option = {
      title: {
        text: '已发布的文章',
        subtext: '文章分类',
        bottom : 'bottom',
        left:"center"
      },
      //hover分类效果
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '文章类别',
          type: 'pie',
          radius: '50%',
          data: Object.values(myList).map(val => ({ value: val.count, name: val.cat })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    pieMyChart.setOption(option)
  }
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
  const showDrawer = () => {
    setOpen(true);
    setTimeout(picView, 0)
  };
  const onClose = () => {
    setOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className='home'>
      <div className="posts">
        <Card
          style={{
            width: '100%',
            marginTop: 16,
          }}
          actions={[
            <span onClick={showDrawer}><PieChartOutlined key="setting" /> <b>本站文章统计</b></span>,
            //<EditOutlined key="edit" />,
            <span onClick={showModal}><AppstoreAddOutlined key="ellipsis" /> <b>添加我的联系方式</b></span>,
          ]}
        >
          <Modal title="我的WeChat二维码" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div style={{textAlign:'center'}}>
              <Image
                width={300}
                style={{ margin: "0 auto" }}
                alt='weChat二维码'
                src="/upload/weChatCode.png"
              />
            </div>

          </Modal>
          <Meta
            avatar={<Avatar src={avatar} />}
            title={`这是 ${currentUser === null ? 'DuFangYuan' : currentUser.username} 的个人博客`}
            description={<>
              <p>本网站基于React和Node.js开发</p>
              <span>您也可以关注网站设计者的 <b>CSDN: </b></span>
              <a rel="noopener noreferrer" href='https://blog.csdn.net/weixin_44384728?spm=1010.2135.3001.5343' target='_blank' style={{ color: 'blue' }}>杜同学。</a>
              <p style={{ fontWeight: 'bold' }}>点击卡片的右下角添加我的联系方式，欢迎与我共同探讨Web方面的技术问题~</p>
            </>}
          />
        </Card>
        <Drawer
          title="本站发布文章分类"
          placement='right'
          closable={false}
          onClose={onClose}
          open={open}
          key='right'
          width='50%'
        >
          <div ref={picRef} style={{ height: '60%', width: '100%' }}></div>
        </Drawer>

        {posts.map(post => (
          <div className="post" key={post.id}>
            <div className="img">
              <Link to={`/post/${post.id}`}>
                <img src={`/upload/${post.img}`} alt={post.title} />
              </Link>
            </div>
            <div className="content">
              <Link className='link' to={`/post/${post.id}`} title={post.title}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.desc)}</p>
              <Link to={`/post/${post.id}`}>
                <button>Read More</button>
              </Link>

            </div>
          </div>
        ))}
        {
          posts.length === 0 && (<Result
            status="404"
            title="Not Find!"
            subTitle="很抱歉，当前类别暂无文章"
            extra={<Link to='/'><Button type="primary">返回主页</Button></Link>}
          />)
        }
      </div>
    </div>
  )
}
