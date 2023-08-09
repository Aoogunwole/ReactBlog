import { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useContext } from 'react';
import dataContext from './dataContext';
import { format } from 'date-fns';
import api from './api/post';

const EditPost = () => {

    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const history = useHistory();
    const { id }  = useParams();

    const {
        posts, setposts 
    } = useContext(dataContext);b
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody])


    const handleEdit = async (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = { id, title: editTitle, datetime, body: editBody };
        try {
          const response = await api.put(`/posts/${id}`, updatedPost);
          setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
          setEditTitle('');
          setEditBody('');
          history.push('/');
        } catch (err) {
          console.log(`Error: ${err.message}`);
        }
      }

    return (
        <main className="NewPost">
            {editTitle &&
                <>
                    <h2>Edit Post</h2>
                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="postTitle">Title:</label>
                        <input
                            id="postTitle"
                            type="text"
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor="postBody">Post:</label>
                        <textarea
                            id="postBody"
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button type="submit" onClick={() => handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            }
            {!editTitle &&
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's disappointing.</p>
                    <p>
                        <Link to='/'>Visit Our Homepage</Link>
                    </p>
                </>
            }
        </main>
    )
}

export default EditPost