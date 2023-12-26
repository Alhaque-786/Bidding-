import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Bids = ({ match }) => {
  const projectId = match.params.projectId;
  const [bids, setBids] = useState([]);
  const [newBid, setNewBid] = useState({ user: '', amount: '' });

  useEffect(() => {
    // Fetch bids data for the specific project from the backend API
    axios.get(`/api/bids/${projectId}`)
      .then(response => setBids(response.data))
      .catch(error => console.error('Error fetching bids:', error));
  }, [projectId]);

  const handleBidSubmit = (e) => {
    e.preventDefault();

    // Submit a new bid to the backend API
    axios.post(`/api/bids/${projectId}`, newBid)
      .then(response => setBids(response.data))
      .catch(error => console.error('Error submitting bid:', error));

    // Clear the form
    setNewBid({ user: '', amount: '' });
  };

  return (
    <div>
      <h1>Bids</h1>
      <ul>
        {bids.map((bid, index) => (
          <li key={index}>
            <p>User: {bid.user}</p>
            <p>Amount: {bid.amount}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleBidSubmit}>
        <label>User:
          <input type="text" value={newBid.user} onChange={(e) => setNewBid({ ...newBid, user: e.target.value })} />
        </label>
        <label>Amount:
          <input type="text" value={newBid.amount} onChange={(e) => setNewBid({ ...newBid, amount: e.target.value })} />
        </label>
        <button type="submit">Submit Bid</button>
      </form>
    </div>
  );
};

export default Bids;
