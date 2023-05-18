import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Empty } from 'antd';
import axios from 'axios'
import { Card } from 'antd';
const { Meta } = Card;
export default function Menu({ cat, postId}) {
    const [posts, setPosts] = useState([])
    const [relative, setRelative] = useState([])

    useEffect(() => {
        axios.get(`/posts/?cat=${cat}`).then(res => {
            setPosts(res.data)
        }).catch(err => {
            console.log(err.message)
        })
    }, [cat])
    useEffect(() => {
        let rel = posts.filter(val => val.id !== postId)
        if(rel.length > 5)
            rel = rel.slice(0,5)
        setRelative([...rel])
    }, [posts, postId])

    const menuRef = useRef(null)

    // let timer = null
    // const handleScroll = () => {
    //     if(timer === null)
    //     {
    //         timer = 'ing'
    //         setTimeout(() => {
    //             const scrollTop = window.pageYOffset; // 页面滚动距离
    //             menuRef.current.style.top = `${scrollTop}px`;
    //             timer = null
    //         }, (100));
    //     }
       
    // }
    // useEffect(() => {
    //     menuRef.current.style.left = `${left+10}px`
    //     menuRef.current.style.top = `${top}px`
    //     let elHeight = menuRef.current.offsetHeight + 10
    //     console.log('h',elHeight)
    //     changeHeight(elHeight)
    //     menuRef.current.style.width = `${elWidth}px`
    //     // chageMenuStyle(elWidth)
    // }, [left,top,elWidth,changeHeight,relative])
    return (
        <div className='menu' ref={menuRef}>
            <h1>您可能关注的文章</h1>
            {
                relative.length !== 0 ?
                    relative.map((post) =>
                    (
                        <div className="post" key={post.id}>
                            <Link to={`/post/${post.id}`}>


                                <Card
                                    hoverable
                                    style={{
                                        // width: `${elWidth}px`,
                                        // maxWidth:"200px"
                                        width:'240px'
                                    }}
                                    cover={<img alt="example" src={`/upload/${post.img}`} />}
                                >
                                    <Meta title={post.title} description={cat} />
                                </Card>
                            </Link>
                        </div>
                    ))
                    : <span><Empty description={`本站暂时没有与 ${cat} 相关的文章`} /></span>
            }
        </div>
    )
}
