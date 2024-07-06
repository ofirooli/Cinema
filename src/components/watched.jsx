import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Watched = ({ movieId }) => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch users, members, and subscriptions concurrently
                const [usersResponse, membersResponse, subsResponse] = await Promise.all([
                    axios.get('http://localhost:3000/users'),
                    axios.get('http://localhost:3000/members'),
                    axios.get('http://localhost:3000/subs')
                ]);

                // Create a map for members to user IDs and for users to full names
                const memberIdToUserId = membersResponse.data.reduce((map, member) => {
                    map[member._id] = member.UserID;
                    return map;
                }, {});

                const userIdToFullName = usersResponse.data.reduce((map, user) => {
                    map[user._id] = user.FullName;
                    return map;
                }, {});

                // Filter subscriptions by movieId and map to full names and dates
                const filteredSubscriptions = subsResponse.data
                    .filter(sub => sub.MovieID === movieId)
                    .map(sub => {
                        const userId = memberIdToUserId[sub.MemberID];
                        const fullName = userIdToFullName[userId] || 'Unknown User';
                        const date = sub.Date

                        return {
                            fullName,
                            watchedDate: date
                        };
                    });

                // Update state with the filtered subscriptions
                setSubscriptions(filteredSubscriptions);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load watched data.');
            }
        };

        fetchData();
    }, [movieId]);

    return (
        <div>
            <h5>Subscriptions watched:</h5>
            {error ? (
                <div>{error}</div>
            ) : (
                <ul>
                    {subscriptions.length === 0 ? (
                        <li>No subscriptions found.</li>
                    ) : (
                        subscriptions.map((subscription, index) => (
                            <li key={index}>
                                <strong>{subscription.fullName}</strong> - {subscription.watchedDate}
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
};

export default Watched;
