import React, { useState, useEffect } from 'react';
import axios from 'react';

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get('/api/projects')
        .then(response => setProjects(response.data))
        .catch(error => console.error('Error fetching projects:', error))
    }, []);

    return (
        <div>
            <h1>Projects</h1>
            <ul>
                {projects.map((project) => (
                    <li key ={project._id}>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <a href = {`/bids/${project._id}`}>View Bids</a>
                      <br />
                      <a href = {`/chat/${project._id}`}>Chat</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}