import { useState } from 'react';
import { Link, NavLink, useParams, useRouteMatch } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const UpdateOrder = () => {
  const { orderId } = useParams();
  // get the  order
  const urlGet = `http://localhost:5000/api/getWorkOrder/${orderId}`;

  const [pendingFetch, error, data] = useFetch(urlGet, {
    credentials: 'include',
  });

  // update
  console.log(orderId);
  return <h1>Updtae Work Order</h1>;
};

export default UpdateOrder;
